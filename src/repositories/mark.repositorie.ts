import { BaseRepository } from "./base.repositorie";

export class markRepo extends BaseRepository<"mark"> {
  constructor() {
    super("mark");
  }
}
