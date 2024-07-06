import { cn } from "../utils/cn";
import React, { InputHTMLAttributes, useId } from "react";

type InputPropsType = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  type?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputPropsType>(
  ({ label = "", placeholder, type = "text", className, ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-lg cursor-pointer">
            {label}
          </label>
        )}
        <input
          className={`${cn("border border-gray-700 rounded-md p-2 bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1", className)}`}
          type={type}
          placeholder={placeholder}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

export default Input;