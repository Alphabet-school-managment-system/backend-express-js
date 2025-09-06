import { BaseRepository } from "./base.repositorie";

export class BranchRepository extends BaseRepository<"branch"> {
  constructor() {
    super("branch");
  }
}
