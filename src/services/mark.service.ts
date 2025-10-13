import { markRepo } from "../repositories/mark.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class MarkService extends BaseService<markRepo> {
  constructor() {
    super(new markRepo());
  }
}
