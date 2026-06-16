import { Response, Request } from "express";
import { BaseRepository } from "./base.repositorie.js";

export class parentRepo extends BaseRepository<"parent"> {
  constructor() {
    super("parent");
  }

  async create(data: any, res: Response, signal?: AbortSignal) {
    return this.create_people(data, res, signal);
  }

  async delete(id: string, signal?: AbortSignal) {
    return this.delete_people(id, signal);
  }

  async search(req: Request) {
    return this.search_people(req);
  }
  async findAll(options: {
    where?: any;
    orderBy?: any;
    take?: number;
    signal?: AbortSignal;
  }) {
    return this.findAll_people(options);
  }
}
