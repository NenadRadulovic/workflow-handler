import { Module } from '@nestjs/common';
import { WorkflowModule } from './workflow/workflow.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({ global: true }),
    ScheduleModule.forRoot(),
    WorkflowModule,
  ],
})
export class AppModule {}
