import { termRepo } from "../repositories/term.repositorie";
import { BaseService } from "./base.service";

export class TermService extends BaseService<termRepo> {
  constructor() {
    super(new termRepo());
  }
}
