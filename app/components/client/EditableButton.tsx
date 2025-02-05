"use client";
import React, { HTMLAttributes, useState } from "react";
import Input from "../server/Input";
import Button from "../server/Button";

interface EditableButtonProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const EditableButton: React.FC<EditableButtonProps> = (props) => {
  const [editTodo, setEditTodo] = useState(false);

  return (
    <div {...props}>
      {editTodo ? (
        <Input
          type="text"
          className="w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setEditTodo(false);
            }
          }}
          defaultValue={props.value}
        />
      ) : (
        <Button onClick={() => setEditTodo(true)}>{props.value}</Button>
      )}
    </div>
  );
};

export default EditableButton;
