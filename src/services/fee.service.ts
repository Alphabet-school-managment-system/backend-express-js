import { feeRepo } from "../repositories/fee.repositorie.js";
import { BaseService } from "./base.service.js";

export class FeeService extends BaseService<feeRepo> {
  constructor() {
    super(new feeRepo());
  }
}
