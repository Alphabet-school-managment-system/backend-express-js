import { BaseRepository } from "./base.repositorie.ts";

export class parentRepo extends BaseRepository<"parent"> {
  constructor() {
    super("parent");
  }
}
