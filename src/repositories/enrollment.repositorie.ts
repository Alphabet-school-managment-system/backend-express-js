import { BaseRepository } from "./base.repositorie.js";

export class EnrollmentRepository extends BaseRepository<"enrollment"> {
  constructor() {
    super("enrollment");
  }
}
