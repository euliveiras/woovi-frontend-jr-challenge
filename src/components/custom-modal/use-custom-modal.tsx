import { useState } from "react";
import { CustomModal } from "./custom-modal";

export function useCustomModal() {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return { Modal: CustomModal, isOpen, showModal, hideModal };
}
