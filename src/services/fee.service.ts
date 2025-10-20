import { feeRepo } from "../repositories/fee.repositorie.ts";
import { BaseService } from "./base.service.ts";

export class FeeService extends BaseService<feeRepo> {
  constructor() {
    super(new feeRepo());
  }
}
