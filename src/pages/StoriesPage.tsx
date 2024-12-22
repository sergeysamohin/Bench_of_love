import { useEffect, useState } from "react";
import { Link, StoryItem, Title } from "../components";
import { User } from "../types";
import { API } from "../api";


export function StoriesPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const usersList = await API.getUsers()
      setUsers(usersList);
    }

    fetchStories();
  }, [])

  return (
    <>
      <Title className="mb-4">Все истории</Title>
      <div className="flex-grow flex flex-col gap-4 mb-4 px-4 overflow-scroll">
        {users.map((user) => user.story.text ? (
          <StoryItem key={user._id} user={user} />
        ) : <></>)}
      </div>
      <Link to="/story" className="self-center">
        Моя история
      </Link>
    </>
  );
}