export type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "DATE";

export interface Question {
  id: string;
  text: string;
  required: boolean;
  options?: string[];
  type: QuestionType;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface ResponsePayload {
  formId: string;
  answers: Record<string, string | string[] | number>;
}

export interface FormResponse {
  id: string;
  formId: string;
  submittedAt: string;
  answers: Record<string, string | string[] | number>;
}
