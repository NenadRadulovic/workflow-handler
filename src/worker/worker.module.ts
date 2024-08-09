import { Module } from '@nestjs/common';
import { QueueModule } from 'src/queue/queue.module';
import { WorkerService } from './worker.service';

@Module({
  imports: [QueueModule],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
