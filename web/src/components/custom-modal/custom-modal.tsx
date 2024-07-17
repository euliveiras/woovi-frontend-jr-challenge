import Paper from "@mui/material/Paper";
import Modal, { ModalProps } from "@mui/material/Modal";

type CustomModalProps = ModalProps & {
  children: React.ReactNode;
  onCancel(): void;
  CloseButton: React.ReactNode;
  ConfirmButton?: React.ReactNode;
};

export function CustomModal({
  children,
  open,
  onClose,
  CloseButton,
  ConfirmButton,
}: CustomModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex size-full items-center justify-center">
        <Paper className="m-8 flex size-full h-56 max-w-lg flex-col items-center justify-center gap-8 p-8">
          {children}
          <span className="mt-auto flex gap-4">
            {CloseButton}
            {ConfirmButton}
          </span>
        </Paper>
      </div>
    </Modal>
  );
}
