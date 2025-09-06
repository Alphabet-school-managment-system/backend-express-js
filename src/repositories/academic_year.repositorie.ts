import { BaseRepository } from "./base.repositorie";

export class academicYearRepo extends BaseRepository<"academicyear"> {
  constructor() {
    super("academicyear");
  }
}
