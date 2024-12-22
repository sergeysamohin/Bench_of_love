import { createBrowserRouter } from "react-router";
import {
  HomePage,
  LoginPage,
  MyStoryPage,
  ProfilePage,
  RegisterPage,
  StoriesPage,
  StoryPage,
} from "../pages";
import { BurgerLayout, Layout } from "../layouts";
import { RequireAuth } from "../auth";
import { ErrorPage } from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><Layout /></RequireAuth>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <BurgerLayout />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "stories",
            element: <StoriesPage />,
          },
          {
            path: "story",
            element: <MyStoryPage />,
          },
          {
            path: "story/:id",
            element: <StoryPage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
