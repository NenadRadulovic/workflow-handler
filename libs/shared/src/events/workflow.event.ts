export class UpdateWorkflowEvent {
  workflowId: string;
  stepIndex: number;
  workflow_status: string;
  result: object;
  error: object;
}
