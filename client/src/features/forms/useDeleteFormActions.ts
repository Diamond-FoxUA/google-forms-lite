import { toast } from "sonner";
import { useDeleteFormMutation } from "./formsApi";

export const useDeleteFormAction = () => {
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

  return {
    handleDelete,
    isDeleting,
  };
};
