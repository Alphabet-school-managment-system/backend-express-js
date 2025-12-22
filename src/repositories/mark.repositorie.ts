import { BaseRepository } from "./base.repositorie.js";

export class markRepo extends BaseRepository<"mark"> {
  constructor() {
    super("mark");
  }
}
