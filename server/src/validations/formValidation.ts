import { z } from "zod";
import { QuestionType } from "@prisma/client";

const questionTypes = Object.values(QuestionType) as [string, ...string[]];

export const createQuestionSchema = z
  .object({
    text: z.string().min(1, "Question text cannot be empty."),
    type: z.enum(questionTypes),
    options: z.array(z.string()).optional().default([]),
  })
  .refine(
    (data) => {
      if (
        (data.type === "MULTIPLE_CHOICE" || data.type === "CHECKBOX") &&
        data.options.length === 0
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Choice-based questions must provide at least one option",
      path: ["options"],
    },
  );

export const createFormSchema = z.object({
  title: z.string().min(1, "Form title is required.").max(255),
  description: z.string().optional(),
  questions: z
    .array(createQuestionSchema)
    .min(1, "Form must have at least one question."),
});

export const submitAnswerSchema = z.object({
  question_id: z.cuid2("Невалідний формат ідентифікатора питання"),
  value: z.any().refine(
    (val) => {
      return (
        typeof val === "string" ||
        (Array.isArray(val) && val.every((item) => typeof item === "string"))
      );
    },
    {
      message: "Answer value must be a string or an array of strings",
    },
  ),
});

export const submitResponseSchema = z.object({
  answers: z
    .array(submitAnswerSchema)
    .min(1, "Response must contain at least one answer."),
});

export type CreateFormInput = z.infer<typeof createFormSchema>;
export type SubmitResponseInput = z.infer<typeof submitResponseSchema>;
