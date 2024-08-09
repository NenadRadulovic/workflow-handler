import { WorkflowStatus } from '@app/shared/database/entities/workflow.schema';
import { CommandFactory } from '@app/shared/services/commands/command.factory';
import {
  CommandTypes,
  WORKFLOW_EXECUTED_EVENT,
  WORKFLOW_QUEUE,
  WORKFLOW_STEP_EXECUTED_EVENT,
  WorkflowExecutedEventPayload,
  WorkflowJobPayload,
  WorkflowStepExecutedEventPayload,
} from '@app/shared/types/workflow.types';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bullmq';

@Processor(WORKFLOW_QUEUE)
@Injectable()
export class WorkerService extends WorkerHost {
  constructor(private readonly eventEmitter: EventEmitter2) {
    super();
  }

  async process(job: Job<WorkflowJobPayload, any, string>): Promise<any> {
    const { workflowId, steps } = job.data;
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      try {
        let data = {};
        const command = CommandFactory.getCommand(
          steps[stepIndex].name as CommandTypes,
        );
        if (steps[stepIndex].dependsOn) {
          data = steps.find(
            (step) => step.name === steps[stepIndex].dependsOn,
          ).result;
        }
        steps[stepIndex].result = await command.execute(data);
        this.eventEmitter.emit(WORKFLOW_STEP_EXECUTED_EVENT, {
          workflowId,
          stepIndex,
          workflow_status: WorkflowStatus.COMPLETED,
          result: steps[stepIndex].result,
          error: null,
        } as WorkflowStepExecutedEventPayload);
      } catch (error) {
        this.handleError(job, error, stepIndex);
      }
    }
    //workflow successfuly completed update workflow to status Completed
    this.eventEmitter.emit(WORKFLOW_EXECUTED_EVENT, {
      workflow_status: WorkflowStatus.COMPLETED,
      workflowId,
    } as WorkflowExecutedEventPayload);
    return job;
  }

  handleError(
    job: Job<WorkflowJobPayload, any, string>,
    error: Error,
    stepIndex: number,
  ) {
    if (job.opts.attempts === job.attemptsMade) {
      job.moveToFailed(error, job.name);
      this.eventEmitter.emit(WORKFLOW_EXECUTED_EVENT, {
        workflow_status: WorkflowStatus.COMPLETED,
        workflowId: job.data.workflowId,
      } as WorkflowExecutedEventPayload);
    }
    this.eventEmitter.emit(WORKFLOW_STEP_EXECUTED_EVENT, {
      workflowId: job.data.workflowId,
      stepIndex,
      workflow_status: WorkflowStatus.FAILED,
      result: null,
      error: error,
    } as WorkflowStepExecutedEventPayload);
  }
}
