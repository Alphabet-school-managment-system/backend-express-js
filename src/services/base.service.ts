import { Request, Response } from "express";

export interface BaseRepository {
  create(data: any, res: Response): Promise<any>;
  findAll(opts: {
    where?: any;
    orderBy?: any;
    take?: number;
    signal?: any;
  }): Promise<any>;
  findById(id: string): Promise<any>;
  update(id: string, data: any): Promise<any>;
  patch(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
  search(req: Request): Promise<any>;
  getIds(id: string): Promise<any>;
}

export class BaseService<TRepository extends BaseRepository> {
  protected repository: TRepository;

  constructor(repository: TRepository) {
    this.repository = repository;
  }

  async create(data: any, res: Response) {
    return this.repository.create(data, res);
  }

  async findAll(req: Request) {
    const {
      sort_by,
      sort_dir,
      limit,
      branch_id: bi,
      academic_year_id: ay,
      school_id: si,
      day,
      grade,
    } = req.query;

    const orderBy = sort_by
      ? { [sort_by as string]: sort_dir === "desc" ? "desc" : "asc" }
      : undefined;

    const take = limit ? parseInt(limit as string, 10) : 10;

    const where: any = {
      ...(ay && { academic_year_id: ay }),
      ...(bi && { branch_id: bi }),
      ...(si && { school_id: si }),
      ...(day && { day }),
      ...(grade && { grade: +grade }),
    };

    const signal = (req as any).prismaSignal;

    return this.repository.findAll({
      where,
      orderBy,
      take,
      signal,
    });
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, data: any) {
    return this.repository.update(id, data);
  }

  async patch(id: string, data: any) {
    return this.repository.patch(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async search(req: Request) {
    return this.repository.search(req);
  }

  async getIds(id: string) {
    return this.repository.getIds(id);
  }
}
