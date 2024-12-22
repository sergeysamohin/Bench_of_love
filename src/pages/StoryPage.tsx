import { useParams } from "react-router";
import { Link } from "../components";
import { HeartIcon } from "../components/icons";
import { User } from "../types";
import { useEffect, useState } from "react";
import { API } from "../api";
import { BASE_IMAGE_URL } from "../constants";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";

export function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [likes, setLikes] = useState(0);
  const [isFound, setIsFound] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await API.getUser(id!);
        setUser(fetchedUser);
        setLikes(fetchedUser.story.likes);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "404") {
            setIsFound(false);
          }
        }
      }
    };

    fetchUser();
  }, []);

  const handleClick = () => {
    const like = async () => {
      await API.like(user!._id, likes);
    };
    const unlike = async () => {
      await API.unlike(user!._id, likes);
    };

    if (isLiked) {
      unlike();
      setLikes(likes - 1);
    } else {
      like();
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  if (!isFound) {
    return <ErrorPage />;
  }

  if (!user) {
    return <LoadingPage/>;
  }

  return (
    <div className="flex-grow flex flex-col justify-center p-4 overflow-hidden">
      <div className="flex flex-col gap-4 p-4 pb-8 border border-primary rounded-xl bg-secondary/5 shadow-lg mb-4 overflow-hidden">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              className="w-full h-full"
              src={`${BASE_IMAGE_URL}${user.profileImage}`}
              alt=""
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-3xl font-bold text-center">{user.name}</h2>
            <div className="w-full h-px bg-black/50 rounded-lg" />
          </div>
          <button onClick={handleClick}>
            {!isLiked ? (
              <div className="h-12 w-12 flex flex-col items-center text-primary bg-secondary/50 p-2 text-xs rounded-full">
                <HeartIcon className="h-4 w-4 fill-primary" />
                {likes}
              </div>
            ) : (
              <div className="h-12 w-12 flex flex-col items-center text-secondary bg-primary p-2 text-xs rounded-full">
                <HeartIcon className="h-4 w-4 fill-secondary" />
                {likes}
              </div>
            )}
          </button>
        </div>
        <p className="p-4 border border-secondary rounded-lg overflow-scroll">
          {user.story.text}
        </p>
      </div>
      <Link to="/stories" className="self-center">
        К историям
      </Link>
    </div>
  );
}
