import { WorkflowStatus } from '../database/entities/workflow.schema';

export type CommandTypes = 'sendEmail' | 'createPdf' | 'getOrders';

export interface WorkflowStepExecutedEventPayload {
  workflowId: string;
  stepIndex: number;
  data?: any;
  workflow_status: WorkflowStatus;
  result?: object;
  error?: object;
}
export interface WorkflowExecutedEventPayload {
  workflowId: string;
  workflow_status: WorkflowStatus;
}

export interface WorkflowJobPayload {
  workflowId: string;
  steps: WorkflowStepJobPayload[];
}

export interface SingleWorkflowStepJobPayload extends WorkflowStepJobPayload {
  workflowId: string;
  name: string;
  stepIndex: number;
  dependsOn: string;
  workflowStatus: string;
  result?: object;
  errors?: object;
}

export interface WorkflowStepJobPayload {
  name: string;
  stepIndex: number;
  dependsOn: string;
  workflowStatus: string;
  result?: object;
  errors?: object;
}

export interface WorkflowUpdatePayload {
  workflowId: string;
  stepIndex: number;
  workflow_status: WorkflowStatus;
  result: object;
  error: object;
}

export const WORKFLOW_STEP_EXECUTED_EVENT = 'workflow_step.executed';
export const WORKFLOW_EXECUTED_EVENT = 'workflow.executed';
export const WORKFLOW_QUEUE = 'workflow';
