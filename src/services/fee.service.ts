import { feeRepo } from "../repositories/fee.repositorie";
import { BaseService } from "./base.service";

export class FeeService extends BaseService<feeRepo> {
  constructor() {
    super(new feeRepo());
  }
}
