import { BaseRepository } from "./base.repositorie.js";

export class BehaviorRepository extends BaseRepository<"behavior"> {
  constructor() {
    super("behavior");
  }
}
