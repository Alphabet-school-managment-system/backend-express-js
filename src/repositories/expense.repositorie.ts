import { BaseRepository } from "./base.repositorie";

export class expenseRepo extends BaseRepository<"expense"> {
  constructor() {
    super("expense");
  }
}
