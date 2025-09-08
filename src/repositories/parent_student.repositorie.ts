import { BaseRepository } from "./base.repositorie";

export class parentStudentRepo extends BaseRepository<"parentstudent"> {
  constructor() {
    super("parentstudent");
  }
}
