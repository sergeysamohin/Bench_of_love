import { ChangeEvent, useState } from "react";
import { Button, Title } from "../components";
import { StorageController } from "../data";
import { API } from "../api";
import { Navigate } from "react-router";

export function MyStoryPage() {
  const user = StorageController.getUser();
  const [story, setStory] = useState(user.story.text)
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setStory(e.target.value)
  }

  const handleClick = () => {
    const patchStory = async () => {
      await API.patchStory(story, user._id)
      const newUser = await API.getUser(user._id)
      
      StorageController.setUser(newUser)
    }

    patchStory();
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/stories"/>
  }

  return (
    <div className="flex-grow flex flex-col gap-4">
      <Title>Моя история</Title>
      <div className="flex-grow px-4 flex">
        <div className="flex-grow flex flex-col gap-4 p-4 pb-8 border border-primary rounded-xl bg-secondary/5 shadow-lg mb-4">
          <textarea
            value={story}
            className="p-4 border border-secondary rounded-lg outline-none resize-none flex-grow bg-transparent"
            placeholder="Напишите вашу историю..."
            onChange={handleChange}
          />
          <Button className="self-center" onClick={handleClick}>Сохранить</Button>
        </div>
      </div>
    </div>
  );
}