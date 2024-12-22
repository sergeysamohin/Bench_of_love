import clsx from "clsx";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router";

interface LinkProps {
  to: string;
  children?: ReactNode;
  className?: string;
}

export function Link({ to, children, className }: LinkProps) {
  return (
    <RouterLink
      to={to}
      className={clsx(
        "font-[Dobryak] text-xl text-extra bg-primary-dim",
        "uppercase pt-2 pb-1 rounded-full px-12",
        className
      )}
    >
      {children}
    </RouterLink>
  );
}
