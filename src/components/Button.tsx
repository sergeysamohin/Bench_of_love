import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "font-[Dobryak] text-xl text-extra bg-primary disabled:bg-primary/80",
        "uppercase pt-2 pb-1 rounded-full px-12",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
