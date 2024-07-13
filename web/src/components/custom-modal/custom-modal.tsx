import Paper from "@mui/material/Paper";
import Modal, { ModalProps } from "@mui/material/Modal";
import Button from "@mui/material/Button";

type CustomModalProps = ModalProps & {
  children: React.ReactNode;
  onConfirm(): void;
  onCancel(): void;
};

export function CustomModal({
  children,
  open,
  onClose,
  onConfirm,
  onCancel,
}: CustomModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex size-full items-center justify-center">
        <Paper className="flex max-w-lg flex-col items-center gap-8 p-8">
          {children}
          <span className="flex gap-4">
            <Button variant="outlined" onClick={onCancel}>
              cancelar
            </Button>
            <Button variant="contained" onClick={onConfirm}>
              confirmar
            </Button>
          </span>
        </Paper>
      </div>
    </Modal>
  );
}
