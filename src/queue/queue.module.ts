import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WORKFLOW_QUEUE } from '@app/shared/types/workflow.types';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('QUEUE_HOST'),
          port: configService.get<number>('QUEUE_PORT'),
          name: WORKFLOW_QUEUE,
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: WORKFLOW_QUEUE,
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    }),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
