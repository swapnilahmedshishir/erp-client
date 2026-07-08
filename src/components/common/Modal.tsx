import { X } from "lucide-react";
import { ReactNode } from "react";

import Button from "./Button";

interface ModalProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  showFooter?: boolean;
}

const Modal = ({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  showFooter = true,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 transition hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">{children}</div>

        {showFooter && (
          <div className="flex justify-end gap-3 border-t px-6 py-4">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              {cancelText}
            </Button>

            {onConfirm && (
              <Button
                variant="destructive"
                loading={loading}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

//use case
// const [open, setOpen] = useState(false);

// <Modal
//   open={open}
//   title="Delete Product"
//   onClose={() => setOpen(false)}
//   onConfirm={handleDelete}
//   confirmText="Delete"
//   loading={isDeleting}
// >
//   <p>
//     Are you sure you want to delete this product?
//   </p>
// </Modal>
