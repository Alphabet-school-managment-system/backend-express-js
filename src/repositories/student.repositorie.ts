import { BaseRepository } from "./base.repositorie";

export class studentRepo extends BaseRepository<"student"> {
  constructor() {
    super("student");
  }
}
