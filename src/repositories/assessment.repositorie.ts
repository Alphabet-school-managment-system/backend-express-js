import { BaseRepository } from "./base.repositorie";

export class AssessmentRepository extends BaseRepository<"assessment"> {
  constructor() {
    super("assessment");
  }
}
