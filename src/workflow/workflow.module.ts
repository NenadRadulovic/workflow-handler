import { Module } from '@nestjs/common';
import { WorkflowRepository } from './workflow.repository';
import {
  Workflow,
  WorkflowSchema,
  WorkflowStep,
  WorkflowStepSchema,
} from '@app/shared/database/entities/workflow.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { QueueModule } from 'src/queue/queue.module';
import { WorkflowController } from './workflow.controller';
import { MongooseDatabaseModule } from '@app/shared/database/mongoose.module';
import { WorkflowService } from './workflow.service';
import { WorkflowSeeder } from '@app/shared/database/seeder/workflow.seeder';
import { WorkflowListener } from './workflow.listener';
import { WorkerModule } from 'src/worker/worker.module';

@Module({
  imports: [
    MongooseDatabaseModule,
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
      { name: WorkflowStep.name, schema: WorkflowStepSchema },
    ]),
    QueueModule,
    WorkerModule,
  ],
  providers: [
    WorkflowRepository,
    WorkflowService,
    WorkflowSeeder,
    WorkflowListener,
  ],
  controllers: [WorkflowController],
})
export class WorkflowModule {}
