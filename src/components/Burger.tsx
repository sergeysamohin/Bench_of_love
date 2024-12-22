import clsx from "clsx";
import { useState } from "react";
import { Link, Navigate } from "react-router";
import { Logo } from "./Logo";
import { API } from "../api";
import { StorageController } from "../data";

const MENU_LINKS = [
  {
    path: "/profile",
    title: "Профиль",
  },
  {
    path: "/story",
    title: "Моя история",
  },
  {
    path: "/stories",
    title: "Читать истории",
  },
];

export function Burger() {
  const [state, setState] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    setState((state) => !state);
  };

  const handleLogout = () => {
    const logout = async () => {
      await API.logout();
      StorageController.setUser(null);
      setRedirect(true);
    }

    logout();
  }

  if (redirect) {
    return <Navigate to="/login"/>
  }

  return (
    <div
      className={clsx(
        "absolute top-0 left-0 right-0 h-screen bg-primary-dim transition-all flex justify-center",
        {
          ["translate-x-16"]: state,
          ["translate-x-full"]: !state,
        }
      )}
    >
      <div className="flex-grow flex flex-col justify-center items-center gap-8 max-w-72 pr-16">
        <Logo />
        <nav>
          <ul className="flex flex-col gap-2 text-extra text-3xl">
            {MENU_LINKS.map((link, index) => (
              <li key={index}>
                <Link to={link.path} onClick={handleClick}>
                  {link.title}
                </Link>
                <div className="w-full h-px bg-extra/50 rounded-md" />
              </li>
            ))}
            <li>
              <button onClick={handleLogout}>Выход</button>
              <div className="w-full h-px bg-extra/50 rounded-md" />
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={clsx(
          "absolute top-0 -left-16 h-16 w-16 bg-primary-dim rounded-l-full",
          "flex flex-col gap-2 justify-center items-center pl-2"
        )}
        onClick={handleClick}
      >
        <div
          className={clsx(
            "w-[60%] h-1 bg-extra rounded-sm origin-left transition-all",
            {
              ["rotate-45 translate-x-[15%]"]: state,
            }
          )}
        />
        <div
          className={clsx("w-[60%] h-1 bg-extra rounded-sm transition-all", {
            ["opacity-0"]: state,
          })}
        />
        <div
          className={clsx(
            "w-[60%] h-1 bg-extra rounded-sm origin-left transition-all",
            {
              ["-rotate-45 translate-x-[15%]"]: state,
            }
          )}
        />
      </div>
    </div>
  );
}
