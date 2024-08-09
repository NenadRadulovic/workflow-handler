export interface Command {
  execute(data: any): Promise<any>;
}
