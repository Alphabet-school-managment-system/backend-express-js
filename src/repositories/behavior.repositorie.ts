import { BaseRepository } from "./base.repositorie";

export class BehaviorRepository extends BaseRepository<"behavior"> {
  constructor() {
    super("behavior");
  }
}
