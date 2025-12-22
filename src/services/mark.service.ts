import { markRepo } from "../repositories/mark.repositorie.js";
import { BaseService } from "./base.service.js";

export class MarkService extends BaseService<markRepo> {
  constructor() {
    super(new markRepo());
  }
}
