import { BaseRepository } from "./base.repositorie.js";

export class AssessmentRepository extends BaseRepository<"assessment"> {
  constructor() {
    super("assessment");
  }
}
