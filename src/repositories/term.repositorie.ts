import { BaseRepository } from "./base.repositorie.ts";

export class termRepo extends BaseRepository<"term"> {
  constructor() {
    super("term");
  }
}
