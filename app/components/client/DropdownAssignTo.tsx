"use client";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import Button from "../server/Button";

interface DropdownAssignToProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}
interface OptionProps {
  name: string;
  onclick: () => void;
}

const options: OptionProps[] = [
  { name: "@Julaeha", onclick: () => {} },
  { name: "@Jinaedi", onclick: () => {} },
  { name: "@Saepul", onclick: () => {} },
  { name: "@Komarudin", onclick: () => {} },
  { name: "@Julaeha", onclick: () => {} },
  { name: "@Jinaedi", onclick: () => {} },
  { name: "@Saepul", onclick: () => {} },
  { name: "@Komarudin", onclick: () => {} },
  { name: "@Julaeha", onclick: () => {} },
  { name: "@Jinaedi", onclick: () => {} },
  { name: "@Saepul", onclick: () => {} },
  { name: "@Komarudin", onclick: () => {} },
  { name: "@Julaeha", onclick: () => {} },
  { name: "@Jinaedi", onclick: () => {} },
  { name: "@Saepul", onclick: () => {} },
  { name: "@Komarudin", onclick: () => {} },
  { name: "@Julaeha", onclick: () => {} },
  { name: "@Jinaedi", onclick: () => {} },
  { name: "@Saepul", onclick: () => {} },
  { name: "@Komarudin", onclick: () => {} },
  { name: "@Julaeha", onclick: () => {} },
  { name: "@Jinaedi", onclick: () => {} },
  { name: "@Saepul", onclick: () => {} },
  { name: "@Komarudin", onclick: () => {} },
  { name: "@Julaeha", onclick: () => {} },
  { name: "@Jinaedi", onclick: () => {} },
  { name: "@Saepul", onclick: () => {} },
  { name: "@Komarudin", onclick: () => {} },
];

const DropdownAssignTo: React.FC<DropdownAssignToProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative inline-block text-left">
      <div>
        <Button
          onClick={() => setOpen(!open)}
          className="inline-flex  rounded-md"
        >
          {props.value}
        </Button>
      </div>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
          <div className="py-[2px]">
            {options.map((option, index) => {
              return (
                <Link key={index} href="#" className="block w-full text-sm">
                  <button
                    className="w-[calc(100%-4px)] px-2 mx-[2px] my-[2px] bg-gray-200 rounded-md text-sm font-medium hover:bg-slate-300"
                    onClick={option.onclick}
                  >
                    {option.name}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownAssignTo;
