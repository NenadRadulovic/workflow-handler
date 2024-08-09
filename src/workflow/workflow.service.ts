import { Injectable } from '@nestjs/common';
import { WorkflowRepository } from './workflow.repository';
import { QueueService } from 'src/queue/queue.service';

@Injectable()
export class WorkflowService {
  constructor(
    private readonly queueService: QueueService,
    private readonly workflowRepository: WorkflowRepository,
  ) {}

  async start(workflowId: string): Promise<void> {
    const workflow = await this.workflowRepository.findWorkflowById(workflowId);
    await this.queueService.createWorkflow(workflow);
  }

  async schedule(workflowId: string, frequency: string): Promise<void> {
    const workflow = await this.workflowRepository.findWorkflowById(workflowId);
    await this.queueService.scheduleWorkflow(workflow, frequency);
  }

  async retryStep(workflowId: string, stepIndex: number) {
    const workflow = await this.workflowRepository.findWorkflowById(workflowId);
    await this.queueService.retryStep(workflow.steps[stepIndex]);
  }

  async retryWorkflow(workflowId: string) {
    const workflow = await this.workflowRepository.findWorkflowById(workflowId);
    await this.queueService.retryWorkflow(workflow);
  }
}
