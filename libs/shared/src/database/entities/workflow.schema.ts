import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum WorkflowStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Schema()
export class WorkflowStep {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: String, enum: Object.values(WorkflowStatus) })
  workflow_status: WorkflowStatus;

  @Prop()
  result: string;

  @Prop({ type: String })
  depends_on: string;

  @Prop()
  error: string;
}

@Schema()
export class Workflow {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [WorkflowStep], default: [] })
  steps: WorkflowStep[];

  @Prop({ type: String, required: true, enum: Object.values(WorkflowStatus) })
  workflow_status: WorkflowStatus;
}

export const WorkflowStepSchema = SchemaFactory.createForClass(WorkflowStep);
export const WorkflowSchema = SchemaFactory.createForClass(Workflow);
