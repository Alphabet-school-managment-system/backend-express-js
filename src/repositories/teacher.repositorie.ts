import { Response } from "express";
import { BaseRepository } from "./base.repositorie.js";

export class teacherRepo extends BaseRepository<"teacher"> {
  constructor() {
    super("teacher");
  }

  async create(data: any, res: Response, signal?: AbortSignal) {
    return this.create_people(data, res, signal);
  }

  async delete(id: string, signal?: AbortSignal) {
    return this.delete_people(id, signal);
  }
}
