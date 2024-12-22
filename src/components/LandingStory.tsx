import { User } from "../types";
import clsx from "clsx";

export function LandingStory({ user }: { user: User }) {
  return (
    <div className="p-4 flex flex-col gap-1 border border-secondary rounded-xl bg-secondary/5">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={`${user.profileImage}`} alt="" />
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
    </div>
  );
}
