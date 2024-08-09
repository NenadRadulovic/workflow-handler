import { createPdf } from '../mocks/mock-services';
import { Command } from './command.interface';

export class CreatePdfCommand implements Command {
  async execute(data: any): Promise<any> {
    return await createPdf(data);
  }
}
