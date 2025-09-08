import { TermService } from "../services/term.service";
import { termSchema, TermInput } from "../validators/zod.schema";
import { BaseController } from "./base.controller";

export class TermController extends BaseController<
  TermService,
  TermInput
> {
  constructor() {
    super(new TermService(), termSchema);
  }
}
