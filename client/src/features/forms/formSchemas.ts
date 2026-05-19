import * as Yup from "yup";
import type { Form } from "./types";

export const formBuilderSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required("Form title is required and cannot be empty.")
    .max(100, "Title is too long (maximum 100 characters)."),
  description: Yup.string().max(
    500,
    "Description cannot exceed 500 characters.",
  ),
  questions: Yup.array()
    .min(
      1,
      "Your form must contain at least one question block before it can be created.",
    )
    .required(),
});

export const buildDynamicFillerSchema = (form: Form) => {
  const schemaFields: Record<string, Yup.ISchema<unknown>> = {};

  form.questions.forEach((q) => {
    if (q.type === "CHECKBOX") {
      const baseArray = Yup.array().of(Yup.string().defined());
      schemaFields[q.id] = q.required
        ? baseArray.min(1, "Please tick at least one checkbox choice.")
        : baseArray;
    } else {
      const baseString = Yup.string();
      schemaFields[q.id] = q.required
        ? baseString.required(
            "This field is mandatory and cannot be left blank.",
          )
        : baseString;
    }
  });

  return Yup.object().shape(schemaFields);
};
