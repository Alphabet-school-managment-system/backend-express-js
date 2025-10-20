import { BaseRepository } from "./base.repositorie.ts";

export class AssessmentRepository extends BaseRepository<"assessment"> {
  constructor() {
    super("assessment");
  }
}
