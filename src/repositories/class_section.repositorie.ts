import { BaseRepository } from "./base.repositorie.ts";

export class ClassSectionRepository extends BaseRepository<"classsection"> {
  constructor() {
    super("classsection");
  }
}
