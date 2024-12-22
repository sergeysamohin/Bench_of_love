import { Outlet } from "react-router";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="min-h-screen bg-extra">
      <Outlet />
      <Footer />
    </div>
  );
}
