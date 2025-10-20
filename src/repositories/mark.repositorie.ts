import { BaseRepository } from "./base.repositorie.ts";

export class markRepo extends BaseRepository<"mark"> {
  constructor() {
    super("mark");
  }
}
