import { ParentType } from "./enums";

export interface ParentStudent {
  _id: string;
  student_id: string;
  parent_id: string;
  type: ParentType;
}