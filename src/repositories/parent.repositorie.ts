import { BaseRepository } from "./base.repositorie";

export class parentRepo extends BaseRepository<"parent"> {
  constructor() {
    super("parent");
  }
}
