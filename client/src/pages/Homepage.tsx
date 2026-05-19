import LinkBtn from "../components/LinkBtn";
import ActionBtn from "../components/ActionBtn";
import {
  useGetFormsQuery,
  useDeleteFormMutation,
} from "../features/forms/formsApi";
import { toast } from "sonner";

export default function Homepage() {
  const { data: forms = [], isLoading = true, error } = useGetFormsQuery();
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();

  const handleDelete = async (id: string, title: string) => {
    const confirm = window.confirm(
      `Are you sure you want to delete the form "${title}"?`,
    );

    if (!confirm) return;

    try {
      await deleteForm(id).unwrap();
    } catch (err) {
      toast.error("Failed to delete the form.");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-[25dvh]">
        <h2 className="text-5xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center pt-[25dvh]">
        <h2 className="text-2xl text-semibold text-rose-600">
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
        <h2 className="text-3xl text-bold text-slate-800">
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
          <h1 className="text-center text-semibold text-2xl">Dashboard</h1>
          <p className="text-sm">Manage and review responses for your forms.</p>
        </div>
        <LinkBtn to="/forms/new">+ Create Form</LinkBtn>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {forms.map((form) => (
          <li key={form.id} className="bg-slate-100 p-6 rounded-xl space-y-8">
            <div>
              <div className="flex flex-col items-center justify-between mb-2">
                <h3 className="text-lg text-slate-800">{form.title}</h3>
                <span className="text-sm text-slate-800 self-start">
                  {form.questions?.length || 0} Questions
                </span>
              </div>
              <p className="line-clamp-3 text-sm">{form.description}</p>
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
