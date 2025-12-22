import { Response } from "express";
import { BaseRepository } from "./base.repositorie.js";

export class studentRepo extends BaseRepository<"student"> {
  constructor() {
    super("student");
  }

  async create(data: any, res: Response, signal?: AbortSignal) {
    return this.create_people(data, res, signal);
  }

  async delete(id: string, signal?: AbortSignal) {
    return this.delete_people(id, signal);
  }
}
