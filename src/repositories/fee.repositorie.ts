import { BaseRepository } from "./base.repositorie";

export class feeRepo extends BaseRepository<"fee"> {
  constructor() {
    super("fee");
  }
}
