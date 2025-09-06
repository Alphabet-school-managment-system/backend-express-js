import { BaseRepository } from "./base.repositorie";

export class AttendanceRepository extends BaseRepository<"attendance"> {
  constructor() {
    super("attendance");
  }
}
