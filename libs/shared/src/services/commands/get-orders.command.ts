import { getOrders } from '../mocks/mock-services';
import { Command } from './command.interface';

export class GetOrdersCommand implements Command {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(data: any): Promise<any> {
    return await getOrders();
  }
}
