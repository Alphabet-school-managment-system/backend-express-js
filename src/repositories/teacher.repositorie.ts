import { BaseRepository } from "./base.repositorie";

export class teacherRepo extends BaseRepository<"teacher"> {
  constructor() {
    super("teacher");
  }
}
