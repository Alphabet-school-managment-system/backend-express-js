import { BaseRepository } from "./base.repositorie";

export class leaveRequestRepo extends BaseRepository<"leaverequest"> {
  constructor() {
    super("leaverequest");
  }
}
