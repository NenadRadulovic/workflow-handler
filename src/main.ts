import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WorkflowSeeder } from '@app/shared/database/seeder/workflow.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seeder = app.get(WorkflowSeeder);
  try {
    await seeder.seed();
    await app.listen(3000);
  } catch (error) {
    console.error('Failed to seed data:', error);
  }
}
bootstrap();
