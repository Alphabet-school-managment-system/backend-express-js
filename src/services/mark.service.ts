import { markRepo } from "../repositories/mark.repositorie";
import { BaseService } from "./base.service";

export class MarkService extends BaseService<markRepo> {
  constructor() {
    super(new markRepo());
  }
}
