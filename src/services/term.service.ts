import { termRepo } from "../repositories/term.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class TermService extends BaseService<termRepo> {
  constructor() {
    super(new termRepo());
  }
}
