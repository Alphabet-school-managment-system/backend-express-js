import { BaseRepository } from "./base.repositorie.ts";

export class studentRepo extends BaseRepository<"student"> {
  constructor() {
    super("student");
  }
}
