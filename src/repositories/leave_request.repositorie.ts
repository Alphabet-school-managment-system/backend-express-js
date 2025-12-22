import { BaseRepository } from "./base.repositorie.js";

export class leaveRequestRepo extends BaseRepository<"leaverequest"> {
  constructor() {
    super("leaverequest");
  }
}
