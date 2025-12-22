import { BaseRepository } from "./base.repositorie.js";

export class expenseRepo extends BaseRepository<"expense"> {
  constructor() {
    super("expense");
  }
}
