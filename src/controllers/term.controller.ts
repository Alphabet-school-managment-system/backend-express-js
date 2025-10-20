import { TermService } from "../services/term.service.ts";
import { termSchema, TermInput } from "../validators/zod.schema.ts";
import { BaseController } from "./base.controller.ts";

export class TermController extends BaseController<
  TermService,
  TermInput
> {
  constructor() {
    super(new TermService(), termSchema);
  }
}
