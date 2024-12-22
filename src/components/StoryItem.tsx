import { Link } from "react-router";
import { User } from "../types";
import clsx from "clsx";
import { BASE_IMAGE_URL } from "../constants";

export function StoryItem({ user }: { user: User }) {

  return (
    <Link
      to={`/story/${user._id}`}
      className="p-4 flex flex-col gap-1 border border-secondary rounded-xl bg-secondary/5"
    >
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={`${BASE_IMAGE_URL}${user.profileImage}`} alt="" />
        </div>
        <h2 className="font-bold text-lg leading-none">{user.name}</h2>
      </div>
      <p
        className={clsx(
          "pl-2 font-light leading-tight line-clamp-3",
          "text-ellipsis overflow-hidden sm:line-clamp-none"
        )}
      >
        {user.story.text}
      </p>
    </Link>
  );
}