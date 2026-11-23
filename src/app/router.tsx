import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { myHabitsRoute } from "../features/habits/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  myHabitsRoute,
]);
