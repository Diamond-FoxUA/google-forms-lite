import { useParams } from "react-router-dom";
import {
  useGetFormByIdQuery,
  useGetResponsesQuery,
} from "../features/forms/formsApi";

import LinkBtn from "../components/LinkBtn";
import type { SingleAnswerPayload } from "../features/forms/types";

export default function FormResponses() {
  const { id } = useParams<{ id: string }>();

  const {
    data: form,
    isLoading: isFormLoading,
    error: formError,
  } = useGetFormByIdQuery(id || "");
  const {
    data: responses = [],
    isLoading: isResponsesLoading,
    error: responsesError,
  } = useGetResponsesQuery(id || "");

  const isLoading = isFormLoading || isResponsesLoading;
  const hasError = formError || responsesError;

  if (isLoading) {
    return (
      <div className="mx-auto bg-violet-600 p-6 w-6 mt-[30dvh] rounded-4xl animate-pulse"></div>
    );
  }

  if (hasError || !form) {
    return (
      <div className="text-center py-16 bg-rose-50 border-2 border-rose-100 rounded-2xl max-w-2xl mx-auto px-6 mt-[10vh] space-y-4">
        <h2 className="text-xl font-semibold text-rose-800">Form Not Found</h2>

        <p className="text-sm text-rose-600">
          This form does not exist or could not be loaded.
        </p>

        <LinkBtn to="/" variant="secondary">
          Back to Dashboard
        </LinkBtn>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 p-6 space-y-8 max-w-4xl mx-auto rounded-2xl animate-fade-in">
      <div className="flex flex-col gap-5 text-center justify-center items-center">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-700">
              Form Responses
            </h1>
            <span className="text-xs text-violet-700 bg-violet-50 rounded-md py-1 px-2.5 uppercase tracking-wider">
              {responses.length} {responses.length === 1 ? "entry" : "entries"}
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Reviewing inputs logs collected for: <span>{form.title}</span>
          </p>
        </div>
        <LinkBtn variant="secondary" to="/">
          Back to Dashboard
        </LinkBtn>
      </div>

      {responses.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 border-2 border-slate-300 rounded-2xl max-w-2xl mx-auto px-6 space-y-2">
          <div className="text-3xl">📊</div>
          <h2 className="text-lg font-semibold text-slate-700">
            No responses submitted yet.
          </h2>
          <p className="text-slate-400 text-sm max-w-xs mx-auto leading-normal">
            Share your live filler questionnaire link with users to begin
            compiling live analytics data.
          </p>
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 min-w-45">
                    Submission Date
                  </th>
                  {form.questions.map((q) => (
                    <th
                      key={q.id}
                      className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 min-w-50 max-w-75 truncate"
                      title={q.text}
                    >
                      {q.text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {responses.map((resp) => (
                  <tr
                    key={resp.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4 text-sm text-slate-500 font-medium">
                      {new Date(resp.submittedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    {form.questions.map((q) => {
                      const answerObj = Array.isArray(resp.answers)
                        ? resp.answers.find(
                            (a: SingleAnswerPayload) => a.questionId === q.id,
                          )
                        : null;

                      const rawValue = answerObj ? answerObj.value : undefined;

                      return (
                        <td
                          key={q.id}
                          className="p-4 text-sm font-medium text-slate-700"
                        >
                          {Array.isArray(rawValue) ? (
                            <div className="flex flex-wrap gap-1.5">
                              {rawValue.map((choice: string, cIdx: number) => (
                                <span
                                  key={cIdx}
                                  className="px-2 py-0.5 bg-violet-50 text-violet-700 border border-violet-100/50 rounded text-xs"
                                >
                                  {choice}
                                </span>
                              ))}
                            </div>
                          ) : rawValue !== undefined &&
                            String(rawValue).trim() !== "" ? (
                            String(rawValue)
                          ) : (
                            <span className="text-slate-300 font-bold">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
