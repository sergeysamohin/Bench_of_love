import { LoadingIcon } from "../components/icons";

export function LoadingPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1280px] px-4 py-6 sm:px-8 min-h-screen justify-center items-center">
      <LoadingIcon className="w-16 h-16 fill-primary text-secondary mx-auto"/>
    </div>
  );
}
