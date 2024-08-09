import { Body, Controller, Param, Post } from '@nestjs/common';
import { WorkflowService } from './workflow.service';

class ScheduleDto {
  frequency: string;
}

class RetryWorkflowStepDto {
  stepIndex: number;
}

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post('start/:workflowId')
  async startWorkflow(@Param('workflowId') workflowId: string) {
    await this.workflowService.start(workflowId);
    return {
      message: 'Workflow started',
    };
  }

  @Post('schedule/:workflowId')
  async scheduleWorkflow(
    @Param('workflowId') workflowId: string,
    @Body() data: ScheduleDto,
  ) {
    await this.workflowService.schedule(workflowId, data.frequency);
    return {
      message: 'Workflow started',
    };
  }

  @Post('retry-step/:workflowId')
  async retryWorkflowStep(
    @Param('workflowId') workflowId: string,
    @Body() data: RetryWorkflowStepDto,
  ) {
    await this.workflowService.retryStep(workflowId, data.stepIndex);
    return {
      message: 'Workflow started',
    };
  }
}
