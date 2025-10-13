import { BaseRepository } from "./base.repositorie.ts";

export class feeRepo extends BaseRepository<"fee"> {
  constructor() {
    super("fee");
  }
}
