import { BaseRepository } from "./base.repositorie.ts";

export class leaveRequestRepo extends BaseRepository<"leaverequest"> {
  constructor() {
    super("leaverequest");
  }
}
