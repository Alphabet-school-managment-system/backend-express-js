import { BaseRepository } from "./base.repositorie.ts";

export class EnrollmentRepository extends BaseRepository<"enrollment"> {
  constructor() {
    super("enrollment");
  }
}
