import clsx from "clsx";
import { ReactNode } from "react";

interface TitleProps {
  children?: ReactNode;
  className?: string;
  variant?: "left" | "center";
}

export function Title({ children, className, variant = 'left' }: TitleProps) {
  return (
    <h1
      className={clsx(
        "font-[Dobryak] bg-secondary uppercase",
        "text-3xl text-extra px-8 pt-3 pb-2 rounded-r-full",
        {
          ['self-start pl-4']: variant == 'left',
          ['self-center rounded-full']: variant == 'center',
        },
        className
      )}
    >
      {children}
    </h1>
  );
}
