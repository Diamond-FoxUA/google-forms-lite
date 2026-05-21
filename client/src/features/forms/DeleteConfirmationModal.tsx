import { createPortal } from "react-dom";
import ActionBtn from "../../components/ActionBtn";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formTitle: string;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  formTitle,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="relative bg-white border border-slate-200 w-full max-w-md p-6 rounded-2xl shadow-xl space-y-6 transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-800">
            Confirm Deletion
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Are you sure you want to delete the form{" "}
            <span className="font-semibold text-slate-700">"{formTitle}"</span>?
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <ActionBtn
            variant="secondary"
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </ActionBtn>

          <ActionBtn
            type="button"
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {isLoading ? "Deleting Form..." : "Delete Form"}
          </ActionBtn>
        </div>
      </div>
    </div>,
    document.body,
  );
}
