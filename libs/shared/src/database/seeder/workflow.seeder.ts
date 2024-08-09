import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Workflow } from '../entities/workflow.schema';

@Injectable()
export class WorkflowSeeder {
  constructor(
    @InjectModel(Workflow.name)
    private readonly workflowModel: Model<Workflow>,
  ) {}

  async seed() {
    const workflows = [
      {
        _id: new Types.ObjectId(),
        name: 'Workflow 1',
        workflow_status: 'pending',
        steps: [
          {
            _id: new Types.ObjectId(),
            name: 'getOrders',
            workflow_status: 'pending',
            depends_on: '',
            result: '',
            error: '',
          },
          {
            _id: new Types.ObjectId(),
            name: 'createPdf',
            workflow_status: 'pending',
            depends_on: 'getOrders',
            result: '',
            error: '',
          },
        ],
      },
      {
        _id: new Types.ObjectId(),
        name: 'Workflow 2',
        workflow_status: 'pending',
        steps: [
          {
            _id: new Types.ObjectId(),
            name: 'getOrders',
            workflow_status: 'pending',
            depends_on: '',
            result: '',
            error: '',
          },
          {
            _id: new Types.ObjectId(),
            name: 'createPdf',
            workflow_status: 'pending',
            depends_on: 'getOrders',
            result: '',
            error: '',
          },
          {
            _id: new Types.ObjectId(),
            name: 'sendEmail',
            workflow_status: 'pending',
            depends_on: '',
            result: '',
            error: '',
          },
        ],
      },
      {
        _id: new Types.ObjectId(),
        name: 'Workflow 3',
        workflow_status: 'pending',
        steps: [
          {
            _id: new Types.ObjectId(),
            name: 'sendEmail',
            workflow_status: 'pending',
            depends_on: '',
            result: '',
            error: '',
          },
        ],
      },
    ];

    for (const workflow of workflows) {
      const existingWorkflow = await this.workflowModel
        .findOne({ name: workflow.name })
        .exec();
      if (!existingWorkflow) {
        await this.workflowModel.create(workflow);
      }
    }

    console.log('Workflows seeded!');
  }
}
