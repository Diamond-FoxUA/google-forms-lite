import LinkBtn from "../components/LinkBtn";
import ActionBtn from "../components/ActionBtn";
import { useGetFormsQuery } from "../features/forms/formsApi";
import { useDeleteFormAction } from "../features/forms/useDeleteFormActions";

export default function Homepage() {
  const { data: forms = [], isLoading = true, error } = useGetFormsQuery();
  const { handleDelete, isDeleting } = useDeleteFormAction();

  if (isLoading) {
    return (
      <div className="mx-auto bg-violet-600 p-6 w-6 mt-[30dvh] rounded-4xl animate-pulse"></div>
    );
  }

  if (error) {
    return (
      <div className="text-center pt-[25dvh]">
        <h2 className="text-2xl font-semibold text-rose-600">
          Server Connection Failed
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Please verify your server is running.
        </p>
      </div>
    );
  }

  if (forms.length === 0) {
    return (
      <div className="text-center mt-[25dvh]">
        <h2 className="text-3xl font-medium text-slate-800">
          No forms available
        </h2>
        <p className="text-slate-500 text-sm mt-1 mb-6">
          Create your first form to get started!
        </p>
        <LinkBtn to="/forms/new">+ Create Form</LinkBtn>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-5 max-w-2xl mx-auto bg-slate-100 rounded-xl p-8">
        <div>
          <h1 className="text-center font-medium text-2xl">Dashboard</h1>
          <p className="text-sm">Manage and review responses for your forms.</p>
        </div>
        <LinkBtn to="/forms/new">+ Create Form</LinkBtn>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {forms.map((form) => (
          <li key={form.id} className="bg-slate-100 p-6 rounded-xl flex flex-col h-full justify-between gap-4">
            <div className="grow">
              <div className="flex flex-col items-center justify-between mb-2">
                <h3 className="text-lg text-slate-800">{form.title}</h3>
              </div>
              <p className="line-clamp-3 text-sm text-slate-500">{form.description}</p>
            </div>

            <div className="flex flex-wrap gap-3 items-center justify-center">
              <LinkBtn to={`/forms/${form.id}/fill`}>Fill Form</LinkBtn>
              <LinkBtn variant="secondary" to={`/forms/${form.id}/responses`}>
                Responses
              </LinkBtn>
              <ActionBtn
                variant="danger"
                isLoading={isDeleting}
                onClick={() => handleDelete(form.id, form.title)}
              >
                Delete Form
              </ActionBtn>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
