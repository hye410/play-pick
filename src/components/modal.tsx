import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRoot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    modalRoot.current = el;
    setIsMounted(true);

    return () => {
      if (modalRoot.current) {
        document.body.removeChild(modalRoot.current);
      }
    };
  }, []);

  if (!isOpen || !isMounted || !modalRoot.current) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={onClose}>
      <div className="relative mx-2 h-auto w-full sm:mx-6 xl:mx-auto xl:w-1/2" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot.current,
  );
};

export default Modal;
