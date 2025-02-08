import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/auth/login";
import { RegisterPage } from "../pages/auth/register";
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    // router page register
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    //   router page login
    path: "/auth/login",
    element: <LoginPage />,
  },
]);
