import { BaseRepository } from "./base.repositorie.ts";

export class parentStudentRepo extends BaseRepository<"parentstudent"> {
  constructor() {
    super("parentstudent");
  }
}
