import Question from "../models/question";

export type QuestionType =
  | "shortText"
  | "longText"
  | "multipleChoice"
  | "checkbox"
  | "dropdown"
  | "date"
  | "time";

export type QuestionData = {
  id: number;
  title: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
};

export type SectionData = {
  id: number;
  title: string;
  description: string;
  questions: Question[];
};

export type SurveyResponse = Record<
  SectionData["id"],
  Record<QuestionData["id"], string>
>;

export type Statistics = Record<
  SectionData["id"],
  Record<QuestionData["id"], string[] | Record<string, number>>
>;
