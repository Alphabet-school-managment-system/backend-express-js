import { BaseRepository } from "./base.repositorie";

export class termRepo extends BaseRepository<"term"> {
  constructor() {
    super("term");
  }
}
