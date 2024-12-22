import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

export function Input({ errorMessage, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <input
        className={clsx("bg-transparent outline-none border-b text-lg py-0.5", {
          ["border-primary text-primary"]: errorMessage,
        })}
        {...props}
      />
      {errorMessage && <p className="text-sm text-primary">{errorMessage}</p>}
    </div>
  );
}
