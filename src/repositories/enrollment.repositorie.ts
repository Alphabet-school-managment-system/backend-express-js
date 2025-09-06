import { BaseRepository } from "./base.repositorie";

export class EnrollmentRepository extends BaseRepository<"enrollment"> {
  constructor() {
    super("enrollment");
  }
}
