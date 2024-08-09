import { CommandTypes } from '@app/shared/types/workflow.types';
import { CreatePdfCommand } from './create-pdf.command';
import { GetOrdersCommand } from './get-orders.command';
import { SendEmailCommand } from './send-email.command';

export class CommandFactory {
  static getCommand(commandName: CommandTypes) {
    switch (commandName) {
      case 'createPdf': {
        return new CreatePdfCommand();
      }
      case 'sendEmail': {
        return new SendEmailCommand();
      }
      case 'getOrders': {
        return new GetOrdersCommand();
      }
      default: {
        throw new Error('Invalid command type provided');
      }
    }
  }
}
