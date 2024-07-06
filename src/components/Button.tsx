import { cn } from "../utils/cn";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    btnType?: "primary" | "outline" | "danger" | "ghost";
    loading?: boolean;
  };

const Button = ({
  children,
  disabled = false,
  className = "",
  btnType = "primary",
  type = "button",
  loading = false,
  ...props
}: ButtonProps) => {
  let baseClass =
    "hover:bg-opacity-90 rounded-md w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  const styles = {
    primary: "px-2 py-1 bg-blue-500 text-white hover:bg-blue-500/90",
    outline: "p-2 bg-transparent border border-gray-700 hover:bg-gray-700/90",
    danger: "py-2 bg-red-500 text-white",
    ghost: "p-2 hover:bg-gray-700/80",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(baseClass, styles[btnType], className)}
      {...props}
    >
      {loading && (
        <div className="border-2 border-transparent w-4 h-4 rounded-full border-t-white border-l-white border-r-white animate-spin"></div>
      )}
      {children}
    </button>
  );
};

export default Button;
