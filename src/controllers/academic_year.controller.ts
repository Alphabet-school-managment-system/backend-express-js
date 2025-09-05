import { Request, Response } from "express";
import { AcademicYearService } from "../services/academic_year.service";
import {
  AcademicYearInput,
  academicYearSchema,
} from "../validators/academic_year.schema";

const academicYearService = new AcademicYearService();

export class AcademicYearController {
  async create(req: Request, res: Response) {
    try {
      const data: AcademicYearInput = academicYearSchema.parse(req.body);

      const academicYear = await academicYearService.createAcademicYear(data);
      res.status(201).json(academicYear);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const academicYears = await academicYearService.getAllAcademicYears();
      res.json(academicYears);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const academicYear = await academicYearService.getAcademicYearById(
        req.params.id
      );
      if (!academicYear) return res.status(404).json({ message: "Not found" });
      res.json(academicYear);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data: AcademicYearInput = academicYearSchema.parse(req.body);

      const updated = await academicYearService.updateAcademicYear(
        req.params.id,
        data
      );
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await academicYearService.deleteAcademicYear(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
