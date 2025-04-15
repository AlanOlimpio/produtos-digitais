import { AppLayout } from "@/pages/_layout/app-layout";
import List from "@/pages/product/list";
import Register from "@/pages/product/register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <List />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
