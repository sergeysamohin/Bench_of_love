import { Outlet } from "react-router";
import { Burger } from "../components";

export function BurgerLayout() {
  return (
    <div className="max-w-[1280px] h-screen mx-auto relative overflow-hidden flex">
      <Burger />
      <div className="flex-grow flex flex-col pt-16 pb-8">
        <Outlet />
      </div>
    </div>
  );
}