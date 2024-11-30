import { useModalStore } from "@/store";
import { useEffect } from "react";

export default function ModalProvider() {
  const { modals, closeModal } = useModalStore();

  useEffect(() => {
    
  }, [])

  return (
    <>
      {modals.map((Modal, index) => (
        <Modal key={index} onClose={() => closeModal(index)} />
      ))}
    </>
  );
}
