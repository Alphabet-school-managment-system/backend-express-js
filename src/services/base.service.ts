import { Request } from "express";

export class BaseService<TRepository> {
  protected repository: TRepository;

  constructor(repository: TRepository) {
    this.repository = repository;
  }

  async create(data: any) {
    // @ts-ignore
    return this.repository.create(data);
  }

  async findAll(req: Request) {
    // @ts-ignore
    return this.repository.findAll(req);
  }

  async findById(id: string) {
    // @ts-ignore
    return this.repository.findById(id);
  }

  async update(id: string, data: any) {
    // @ts-ignore
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    // @ts-ignore
    return this.repository.delete(id);
  }
}
