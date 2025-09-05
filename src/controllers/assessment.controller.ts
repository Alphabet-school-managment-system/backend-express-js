import { Request, Response } from "express";
import { AssessmentService } from "../services/assessment.service";
import {
  AssessmentInput,
  assessmentSchema,
} from "../validators/assessment.schema";

const assessmentService = new AssessmentService();

export class AssessmentController {
  async create(req: Request, res: Response) {
    try {
      const data: AssessmentInput = assessmentSchema.parse(req.body);

      const assessment = await assessmentService.createAssessment(data);
      res.status(201).json(assessment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const assessments = await assessmentService.getAllAssessments();
      res.json(assessments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const assessment = await assessmentService.getAssessmentById(
        req.params.id
      );
      if (!assessment) return res.status(404).json({ message: "Not found" });
      res.json(assessment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data: AssessmentInput = assessmentSchema.parse(req.body);

      const updated = await assessmentService.updateAssessment(
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
      await assessmentService.deleteAssessment(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
