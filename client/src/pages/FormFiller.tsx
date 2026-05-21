import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, getIn } from "formik";
import { toast } from "sonner";
import { useMemo } from "react";

import ActionBtn from "../components/ActionBtn";
import LinkBtn from "../components/LinkBtn";
import { buildDynamicFillerSchema } from "../features/forms/formSchemas";
import { ScrollToFieldError } from "../features/forms/hooks";
import {
  useGetFormByIdQuery,
  useSubmitResponseMutation,
} from "../features/forms/formsApi";

interface FetchBaseQueryError {
  status: number;
  data: unknown;
}

export default function FormFiller() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: form,
    isLoading: isFormLoading,
    isError,
  } = useGetFormByIdQuery(id ?? "", {
    skip: !id,
  });

  const [submitResponse, { isLoading: isSubmitting }] =
    useSubmitResponseMutation();

  const validationSchema = useMemo(() => {
    if (!form) return null;
    return buildDynamicFillerSchema(form);
  }, [form]);

  if (isFormLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-slate-500 font-medium animate-pulse">
          Loading form details...
        </p>
      </div>
    );
  }

  if (isError || !form || !validationSchema) {
    return (
      <div className="text-center p-8 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-4">
        <p className="text-rose-500 font-semibold">
          Form not found or failed to load.
        </p>
        <LinkBtn to="/" variant="secondary">
          Back to Homepage
        </LinkBtn>
      </div>
    );
  }

  const initialValues: Record<string, unknown> = {};
  form.questions.forEach((q) => {
    initialValues[q.id] = q.type === "CHECKBOX" ? [] : "";
  });

  const handleSubmitResponses = async (values: Record<string, unknown>) => {
    const transformedAnswers = form.questions.map((q) => ({
      id: q.id,
      questionId: q.id,
      question_id: q.id,
      value: values[q.id] ?? (q.type === "CHECKBOX" ? [] : ""),
    }));

    try {
      await submitResponse({
        formId: form.id,
        answers: transformedAnswers as unknown as Record<
          string,
          string | string[]
        >,
      }).unwrap();

      toast.success("Your responses have been successfully submitted!");
      navigate("/");
    } catch (err) {
      if (err && typeof err === "object" && "data" in err && "status" in err) {
        const queryError = err as FetchBaseQueryError;
        console.error("Submission failed:", queryError.data);
      }
      toast.error("Failed to submit responses.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b-3 space-y-2 border-b-slate-200 pb-5 px-5">
        <h1 className="text-2xl font-semibold text-slate-700">{form.title}</h1>
        {form.description && (
          <p className="text-sm text-slate-500 whitespace-pre-line">
            {form.description}
          </p>
        )}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitResponses}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="space-y-6">
            <ScrollToFieldError />

            <div className="space-y-6">
              {form.questions.map((q, idx) => {
                const error = getIn(errors, q.id);
                const isTouched = getIn(touched, q.id);
                const hasError = error && isTouched;

                const uniqueOptions = Array.from(
                  new Set((q.options as string[]) || []),
                );

                return (
                  <div
                    key={q.id}
                    className={`bg-slate-50 border-2 ${
                      hasError
                        ? "border-rose-300 ring-1 ring-rose-100"
                        : "border-slate-200"
                    } p-6 rounded-2xl shadow-xs space-y-4 transition-all`}
                  >
                    <div className="space-y-1">
                      <span className="font-semibold text-slate-700 block">
                        {idx + 1}. {q.text}
                      </span>
                    </div>

                    {q.type === "TEXT" && (
                      <Field
                        id={q.id}
                        name={q.id}
                        type="text"
                        placeholder="Type your answer here..."
                        className="w-full px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-slate-700"
                      />
                    )}

                    {q.type === "DATE" && (
                      <Field
                        id={q.id}
                        name={q.id}
                        type="date"
                        className="w-full max-w-xs px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-slate-700"
                      />
                    )}

                    {q.type === "MULTIPLE_CHOICE" && q.options && (
                      <div className="space-y-2.5" role="group">
                        {uniqueOptions.map((option, optIdx) => {
                          const optionId = `${q.id}-${optIdx}`;
                          return (
                            <label
                              key={optionId}
                              htmlFor={optionId}
                              className="flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-600 select-none"
                            >
                              <input
                                type="radio"
                                id={optionId}
                                name={q.id}
                                value={option}
                                checked={values[q.id] === option}
                                onChange={() => setFieldValue(q.id, option)}
                                className="h-4 w-4 text-violet-600 border-slate-300 focus:ring-violet-500 cursor-pointer"
                              />
                              {option}
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {q.type === "CHECKBOX" && q.options && (
                      <div className="space-y-2.5" role="group">
                        {uniqueOptions.map((option, optIdx) => {
                          const optionId = `${q.id}-${optIdx}`;
                          const currentValues =
                            (values[q.id] as string[]) || [];
                          const isChecked = currentValues.includes(option);

                          return (
                            <label
                              key={optionId}
                              htmlFor={optionId}
                              className="flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-600 select-none"
                            >
                              <input
                                type="checkbox"
                                id={optionId}
                                name={optionId}
                                value={option}
                                checked={isChecked}
                                onChange={() => {
                                  const nextValues = isChecked
                                    ? currentValues.filter((v) => v !== option)
                                    : [...currentValues, option];
                                  setFieldValue(q.id, nextValues);
                                }}
                                className="h-4 w-4 text-violet-600 border-slate-300 rounded-sm focus:ring-violet-500 cursor-pointer"
                              />
                              {option}
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {hasError && (
                      <p className="text-sm text-rose-500 mt-1">{error}</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <LinkBtn to="/" variant="secondary">
                Cancel
              </LinkBtn>
              <ActionBtn
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Responses"}
              </ActionBtn>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
