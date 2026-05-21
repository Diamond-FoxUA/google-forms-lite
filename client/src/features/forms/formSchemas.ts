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
    .of(
      Yup.object().shape({
        id: Yup.string().required(),
        type: Yup.string().required(),
        text: Yup.string()
          .trim()
          .required("Please provide a title prompt for this question block."),
        options: Yup.array()
          .of(
            Yup.string().trim().required("Option field cannot be left blank."),
          )
          .optional(),
      }),
    )
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
      schemaFields[q.id] = Yup.array()
        .of(Yup.string().defined())
        .min(1, "Please tick at least one checkbox choice.")
        .required("Please tick at least one checkbox choice.");
    } else {
      schemaFields[q.id] = Yup.string()
        .trim()
        .required("This field is mandatory and cannot be left blank.");
    }
  });

  return Yup.object().shape(schemaFields);
};
