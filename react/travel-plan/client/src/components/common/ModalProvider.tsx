import { useModalStore } from "@/store";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ModalProvider() {
  const { modals, closeModal, clearModals } = useModalStore();
  const location = useLocation();

  useEffect(() => {
    clearModals();
  }, [location])

  return (
    <>
      {modals.map((Modal, index) => (
        <Modal key={index} onClose={() => closeModal(index)} />
      ))}
    </>
  );
}
