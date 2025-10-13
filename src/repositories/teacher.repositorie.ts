import { BaseRepository } from "./base.repositorie.ts";

export class teacherRepo extends BaseRepository<"teacher"> {
  constructor() {
    super("teacher");
  }
}
