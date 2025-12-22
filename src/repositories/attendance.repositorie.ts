import { BaseRepository } from "./base.repositorie.js";

export class AttendanceRepository extends BaseRepository<"attendance"> {
  constructor() {
    super("attendance");
  }
}
