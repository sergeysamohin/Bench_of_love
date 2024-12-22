import { useState } from "react";
import { Button } from "../components";
import { Navigate } from "react-router";

export function ErrorPage() {
  const [redirect, setRedirect] = useState(false);
  const handleClick = () => {
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/stories"/>
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1280px] px-4 py-6 sm:px-8 min-h-screen justify-center items-center">
      <h1 className="font-[Dobryak] bg-primary uppercase text-3xl text-extra px-8 pt-3 pb-2 rounded-r-full self-center rounded-full">
        УПС, ОШИБОЧКА
      </h1>
      <p className="text-center">Кажется, страницы, на которую вы желаете попасть, не существует.</p>
      <Button className="w-64" onClick={handleClick}>НА ГЛАВНУЮ</Button>
    </div>
  );
}
