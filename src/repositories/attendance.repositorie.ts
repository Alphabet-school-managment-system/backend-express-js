import { BaseRepository } from "./base.repositorie.ts";

export class AttendanceRepository extends BaseRepository<"attendance"> {
  constructor() {
    super("attendance");
  }
}
