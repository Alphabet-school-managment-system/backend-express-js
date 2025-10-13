import { BaseRepository } from "./base.repositorie.ts";

export class BehaviorRepository extends BaseRepository<"behavior"> {
  constructor() {
    super("behavior");
  }
}
