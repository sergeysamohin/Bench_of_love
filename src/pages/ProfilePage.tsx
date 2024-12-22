import { useState } from "react";
import { Button, Link, Title } from "../components";
import { BASE_IMAGE_URL } from "../constants";
import { StorageController } from "../data";
import { API } from "../api";
import { Navigate } from "react-router";

export function ProfilePage() {
  const [redirect, setRedirect] = useState(false);

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
  const user = StorageController.getUser();

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <Title>Профиль</Title>
      <div className="flex flex-col gap-4 px-4 overflow-hidden">
        <div className="flex gap-4 items-center border border-secondary rounded-xl bg-secondary/5 shadow-lg p-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img className="w-full h-full" src={`${BASE_IMAGE_URL}${user.profileImage}`} alt="" />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-center">{user.name}</h2>
            <div className="w-full h-px bg-black/50 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-1 p-4 pb-8 border border-primary rounded-xl bg-secondary/5 shadow-lg overflow-scroll">
          <h3 className="font-[Dobryak] text-center text-primary text-2xl">
            МОЯ ИСТОРИЯ
          </h3>
          <p className="p-4 border border-secondary rounded-lg overflow-scroll mb-4">
            {user.story.text}
          </p>
          <Link to="/story" className="self-center">
            Изменить
          </Link>
        </div>
        <Button className="self-center" onClick={handleLogout}>Выйти</Button>
      </div>
    </div>
  );
}