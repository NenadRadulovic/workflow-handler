import {
  Workflow,
  WorkflowStatus,
  WorkflowStep,
} from '@app/shared/database/entities/workflow.schema';
import {
  SingleWorkflowStepJobPayload,
  WORKFLOW_QUEUE,
  WorkflowJobPayload,
} from '@app/shared/types/workflow.types';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Queue } from 'bullmq';
import { CronJob } from 'cron';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(WORKFLOW_QUEUE) private readonly workflowQueue: Queue,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async createWorkflow(workflow: Workflow): Promise<void> {
    const jobData: WorkflowJobPayload = {
      workflowId: workflow._id.toString(),
      steps: workflow.steps.map((step, index) => {
        return {
          name: step.name,
          stepIndex: index,
          dependsOn: step.depends_on,
          workflowStatus: WorkflowStatus.PENDING,
        };
      }),
    };

    await this.workflowQueue.add(`${workflow._id}-${workflow.name}`, jobData, {
      jobId: `${workflow._id}-${workflow.name}`,
    });
  }

  async scheduleWorkflow(workflow: Workflow, frequency: string) {
    const job = new CronJob(frequency, async () => {
      await this.createWorkflow(workflow);
    });
    this.schedulerRegistry.addCronJob(workflow.name, job);
  }

  async executeJob(
    workflowId: string,
    stepIndex: number,
    workflowStep: WorkflowStep,
  ) {
    const jobData: SingleWorkflowStepJobPayload = {
      dependsOn: workflowStep.depends_on,
      name: workflowStep.name,
      workflowId,
      stepIndex,
      workflowStatus: WorkflowStatus.PENDING,
    };
    await this.workflowQueue.add(`retry-${workflowStep.name}`, jobData);
    return workflowStep;
  }

  async retryStep(workflowStep: WorkflowStep) {
    const job = (await this.workflowQueue.getFailed()).find(
      (job) => job.name === `${workflowStep._id}-${workflowStep.name}`,
    );
    await job.retry();
  }

  async retryWorkflow(workflow: Workflow) {
    const job = (await this.workflowQueue.getFailed()).find(
      (job) => job.name === `${workflow._id}-${workflow.name}`,
    );
    await job.retry();
  }
}
