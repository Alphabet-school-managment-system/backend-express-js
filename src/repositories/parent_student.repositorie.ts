import { BaseRepository } from "./base.repositorie.js";

export class parentStudentRepo extends BaseRepository<"parentstudent"> {
  constructor() {
    super("parentstudent");
  }
}
