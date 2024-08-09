import { Workflow } from '@app/shared/database/entities/workflow.schema';
import {
  WorkflowExecutedEventPayload,
  WorkflowUpdatePayload,
} from '@app/shared/types/workflow.types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class WorkflowRepository {
  constructor(
    @InjectModel(Workflow.name) private workflowModel: Model<Workflow>,
  ) {}
  async updateStepStatus(payload: WorkflowUpdatePayload) {
    const { workflowId, workflow_status, result, error, stepIndex } = payload;
    const objectId = Types.ObjectId.createFromHexString(workflowId);
    const workflow = await this.workflowModel.findById(objectId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }
    workflow.steps[stepIndex].workflow_status = workflow_status;
    workflow.steps[stepIndex].result = JSON.stringify(result);
    workflow.steps[stepIndex].error = JSON.stringify(error);
    return workflow.save();
  }

  async updateWorkflow(payload: WorkflowExecutedEventPayload) {
    const { workflowId, workflow_status } = payload;
    const objectId = Types.ObjectId.createFromHexString(workflowId);
    const workflow = await this.workflowModel.findById(objectId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }
    workflow.workflow_status = workflow_status;
    return workflow.save();
  }

  async findWorkflowById(workflowId: string): Promise<Workflow> {
    const objectId = Types.ObjectId.createFromHexString(workflowId);
    const workflow = await this.workflowModel.findById(objectId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }
    return workflow;
  }

  async getWorkflowStepDataById(workflowId: string, workflowStepId: number) {
    const objectId = Types.ObjectId.createFromHexString(workflowId);
    const workflow = await this.workflowModel.findById(objectId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }
    if (workflowStepId === 0) {
      return {};
    }
    return workflow.steps[workflowStepId - 1].result;
  }
}
