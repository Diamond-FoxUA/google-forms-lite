import { useNavigate } from "react-router-dom";
import { useCreateFormMutation } from "../features/forms/formsApi";
import { Formik, Form, Field, FieldArray, getIn } from "formik";
import { toast } from "sonner";

import ActionBtn from "../components/ActionBtn";
import LinkBtn from "../components/LinkBtn";
import { formBuilderSchema } from "../features/forms/formSchemas";
import { ScrollToFieldError } from "../features/forms/hooks";
import type { Question } from "../features/forms/types";

interface FormValues {
  title: string;
  description: string;
  questions: Question[];
}

export default function FormBuilder() {
  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();

  const initialValues: FormValues = {
    title: "",
    description: "",
    questions: [],
  };

  const handleSaveForm = async (values: FormValues) => {
    try {
      await createForm({
        title: values.title.trim(),
        description: values.description.trim(),
        questions: values.questions,
      }).unwrap();

      toast.success("Form configuration successfully saved!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to save the form.");
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b-3 space-y-2 border-b-slate-200 pb-5 px-5">
        <h1 className="text-2xl font-semibold text-slate-700">
          Create Your Form
        </h1>
        <p className="text-sm text-slate-500">
          Add questions, customize choice options, and build your custom layout
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={formBuilderSchema}
        onSubmit={handleSaveForm}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="space-y-6">
            <ScrollToFieldError />

            <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-2xl shadow-xs space-y-4">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-slate-700" htmlFor="title">
                  Form Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g., Customer Engagement Questionnaire"
                  className={`w-full px-4 py-2.5 bg-slate-50 border-2 ${
                    errors.title && touched.title
                      ? "border-rose-300 ring-1 ring-rose-100"
                      : "border-slate-200"
                  } rounded-xl font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-violet-500 transition-all`}
                />
                {errors.title && touched.title && (
                  <p className="text-sm text-rose-500 mt-1">{errors.title}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="font-semibold text-slate-700"
                  htmlFor="description"
                >
                  Description (Optional)
                </label>
                <Field
                  id="description"
                  as="textarea"
                  name="description"
                  placeholder="Provide precise contextual directives..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-violet-500 transition-all resize-none"
                />
              </div>
            </div>

            <FieldArray name="questions">
              {({ push, remove }) => (
                <div className="space-y-10">
                  <ul className="space-y-10">
                    {values.questions.map((q, qIdx) => {
                      const questionFieldName = `questions.${qIdx}.text`;
                      const questionError = getIn(errors, questionFieldName);
                      const questionTouched = getIn(touched, questionFieldName);

                      return (
                        <li key={q.id || qIdx}>
                          <div className="flex flex-col sm:flex-row gap-3 justify-between items-start">
                            <div className="flex-1 flex flex-col gap-2 w-full">
                              <label className="font-medium text-slate-500 uppercase">
                                Question {qIdx + 1}
                              </label>
                              <Field
                                id={questionFieldName}
                                name={questionFieldName}
                                type="text"
                                placeholder="State the prompt title explicitly here..."
                                className={`w-full px-3 py-2 bg-slate-50 border-2 ${
                                  questionError && questionTouched
                                    ? "border-rose-300 ring-1 ring-rose-100"
                                    : "border-slate-200"
                                } rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-violet-500 transition-all`}
                              />
                              {questionError && questionTouched && (
                                <p className="text-sm text-rose-500 mt-1">
                                  {questionError}
                                </p>
                              )}
                            </div>
                            <span className="text-sm font-semibold px-2.5 py-1 bg-violet-50 text-violet-700 rounded-md">
                              {q.type.replace("_", " ")}
                            </span>
                          </div>

                          {["MULTIPLE_CHOICE", "CHECKBOX"].includes(q.type) &&
                            q.options && (
                              <div className="space-y-2 border-l-2 border-slate-100 pl-4 ml-1 mt-2">
                                <label className="text-xs font-bold text-slate-400 block mb-1">
                                  Answer Fields
                                </label>
                                {q.options.map((_, optIdx) => {
                                  const optionFieldName = `questions.${qIdx}.options.${optIdx}`;
                                  const optionError = getIn(
                                    errors,
                                    optionFieldName,
                                  );
                                  const optionTouched = getIn(
                                    touched,
                                    optionFieldName,
                                  );

                                  return (
                                    <div key={optIdx} className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <div
                                          className={`h-4 w-4 shrink-0 border border-slate-300 ${
                                            q.type === "MULTIPLE_CHOICE"
                                              ? "rounded-full"
                                              : "rounded-sm"
                                          } bg-slate-50`}
                                        />
                                        <Field
                                          id={optionFieldName}
                                          name={optionFieldName}
                                          type="text"
                                          className={`flex-1 max-w-md px-2 py-1 border-b ${
                                            optionError && optionTouched
                                              ? "border-rose-400 focus:border-rose-500"
                                              : "border-transparent hover:border-gray-200 focus:border-violet-500"
                                          } focus:outline-none text-sm font-medium transition-all bg-transparent`}
                                        />
                                        {q.options!.length > 1 && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const updatedOptions = [
                                                ...q.options!,
                                              ];
                                              updatedOptions.splice(optIdx, 1);
                                              setFieldValue(
                                                `questions.${qIdx}.options`,
                                                updatedOptions,
                                              );
                                            }}
                                            className="text-slate-400 hover:text-rose-500 text-xs p-1 cursor-pointer transition-colors"
                                          >
                                            ✕
                                          </button>
                                        )}
                                      </div>
                                      {optionError && optionTouched && (
                                        <p className="text-xs text-rose-500 pl-6">
                                          {optionError}
                                        </p>
                                      )}
                                    </div>
                                  );
                                })}
                                <ActionBtn
                                  type="button"
                                  onClick={() =>
                                    setFieldValue(`questions.${qIdx}.options`, [
                                      ...q.options!,
                                      `Option ${q.options!.length + 1}`,
                                    ])
                                  }
                                >
                                  + Add New Option
                                </ActionBtn>
                              </div>
                            )}

                          <div className="flex items-center justify-end border-b-2 pb-6 border-slate-100 pt-4 mt-4">
                            <ActionBtn
                              type="button"
                              variant="danger"
                              onClick={() => remove(qIdx)}
                            >
                              Remove Card Block
                            </ActionBtn>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                    <h2 className="text-lg font-semibold text-slate-600 block">
                      Append Question Blocks
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            id: crypto.randomUUID(),
                            type: "TEXT",
                            text: "",
                            options: [],
                          })
                        }
                        className="px-3 py-2 border border-slate-200 bg-white rounded-xl text-sm hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs text-slate-700 font-semibold active:scale-98"
                      >
                        + Text
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            id: crypto.randomUUID(),
                            type: "MULTIPLE_CHOICE",
                            text: "",
                            options: ["Option 1", "Option 2"],
                          })
                        }
                        className="px-3 py-2 border border-slate-200 bg-white rounded-xl text-sm hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs text-gray-700 font-semibold active:scale-98"
                      >
                        + Single Choice
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            id: crypto.randomUUID(),
                            type: "CHECKBOX",
                            text: "",
                            options: ["Option 1", "Option 2"],
                          })
                        }
                        className="px-3 py-2 border border-slate-200 bg-white rounded-xl text-sm hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs text-gray-700 font-semibold active:scale-98"
                      >
                        + Checkbox
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            id: crypto.randomUUID(),
                            type: "DATE",
                            text: "",
                            options: [],
                          })
                        }
                        className="px-3 py-2 border border-slate-200 bg-white rounded-xl text-sm hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs text-gray-700 font-semibold active:scale-98"
                      >
                        + Date
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </FieldArray>

            {errors.questions &&
              touched.questions &&
              typeof errors.questions === "string" && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold p-4 rounded-xl">
                  {errors.questions}
                </div>
              )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <LinkBtn to="/" variant="secondary">
                Cancel
              </LinkBtn>
              <ActionBtn type="submit" variant="primary" isLoading={isLoading}>
                {isLoading ? "Saving Form..." : "Save Form"}
              </ActionBtn>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
