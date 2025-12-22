import { BaseRepository } from "./base.repositorie.js";

export class feeRepo extends BaseRepository<"fee"> {
  constructor() {
    super("fee");
  }
}
