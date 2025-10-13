import { BaseRepository } from "./base.repositorie.ts";

export class expenseRepo extends BaseRepository<"expense"> {
  constructor() {
    super("expense");
  }
}
