import { sendEmail } from '../mocks/mock-services';
import { Command } from './command.interface';

export class SendEmailCommand implements Command {
  async execute(data: any): Promise<any> {
    return await sendEmail(data);
  }
}
