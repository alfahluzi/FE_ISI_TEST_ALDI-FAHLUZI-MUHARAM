"use client";
import React, { useState } from "react";
import ButtonOnClient from "./ButtonOnClient";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  title,
  children,
  content,
  className,
}) => {
  const [open, setOpen] = useState(show);

  return (
    <>
      <ButtonOnClient className={className} onClick={() => setOpen(true)}>
        {children}
      </ButtonOnClient>
      {open && (
        <div className="fixed text-red-950 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-[400px] max-w-[100%]">
            <div className="flex justify-between items-center">
              <h2>{title}</h2>
              <button
                onClick={() => {
                  onClose();
                  setOpen(false);
                }}
                className="bg-none border-none text-sm cursor-pointer"
              >
                &times;
              </button>
            </div>
            <div className="mt-2">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
