import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={
        props.className +
        " px-2 bg-gray-100 border-gray-700 rounded-md focus:outline-none focus:border-gray-900"
      }
    />
  );
};

export default Input;
