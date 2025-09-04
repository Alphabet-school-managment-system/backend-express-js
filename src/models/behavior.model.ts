import { BehaviorType } from "./enums";

export interface Behavior {
  _id: string;
  student_id?: string | null;
  date?: Date | null;
  description?: string | null;
  type: BehaviorType;
}
