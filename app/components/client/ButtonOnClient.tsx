"use client";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonOnClientProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonOnClient: React.FC<ButtonOnClientProps> = (props) => {
  return (
    <button
      {...props}
      className={
        props.className +
        " bg-gray-700 border-gray-900 text-white font-bold px-2 rounded-md hover:bg-gray-800"
      }
    />
  );
};

export default ButtonOnClient;
