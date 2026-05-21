import { useState } from "react";
import { toast } from "sonner";
import { useDeleteFormMutation } from "./formsApi";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface FormDeleteData {
  id: string;
  title: string;
}

export const useDeleteFormAction = () => {
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDeleteData | null>(null);

  const handleDeleteTrigger = (id: string, title: string) => {
    setFormData({ id, title });
    setIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!formData) return;

    try {
      await deleteForm(formData.id).unwrap();
      toast.success("Form configuration successfully deleted.");
      setIsOpen(false);
      setFormData(null);
    } catch (err) {
      toast.error("Failed to delete the form.");
      console.error(err);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setFormData(null);
  };

  const deleteModalElement = DeleteConfirmationModal({
    isOpen,
    formTitle: formData?.title ?? "",
    isLoading: isDeleting,
    onClose: handleClose,
    onConfirm: handleConfirmDelete,
  });

  return {
    handleDelete: handleDeleteTrigger,
    isDeleting,
    deleteModalElement,
  };
};
