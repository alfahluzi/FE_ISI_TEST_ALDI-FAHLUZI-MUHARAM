import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={
        props.className +
        "  border border-gray-300 hover:bg-gray-300 text-slate-500 font-bold px-2 rounded-md "
      }
    />
  );
};

export default Button;
