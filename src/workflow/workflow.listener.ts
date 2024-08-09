import { OnEvent } from '@nestjs/event-emitter';
import { WorkflowRepository } from './workflow.repository';
import { Injectable } from '@nestjs/common';
import {
  WORKFLOW_EXECUTED_EVENT,
  WORKFLOW_STEP_EXECUTED_EVENT,
  WorkflowExecutedEventPayload,
  WorkflowStepExecutedEventPayload,
} from '@app/shared/types/workflow.types';

@Injectable()
export class WorkflowListener {
  constructor(private readonly workflowRepository: WorkflowRepository) {}

  @OnEvent(WORKFLOW_STEP_EXECUTED_EVENT)
  async handleWorkflowStepUpdateEvent(
    payload: WorkflowStepExecutedEventPayload,
  ) {
    const { workflowId, stepIndex, workflow_status, result, error } = payload;
    await this.workflowRepository.updateStepStatus({
      error,
      result,
      stepIndex,
      workflow_status,
      workflowId,
    });
  }

  @OnEvent(WORKFLOW_EXECUTED_EVENT)
  async handleWorkflowUpdateEvent(payload: WorkflowExecutedEventPayload) {
    const { workflowId, workflow_status } = payload;
    await this.workflowRepository.updateWorkflow({
      workflow_status,
      workflowId,
    });
  }
}
