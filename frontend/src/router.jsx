import React from "react";
import { useRoutes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import PrivateRoutes from "./Components/PrivateRoutes";
import { ROUTE_CONSTANT } from "./constant/route_constant";


const Router = () => {
  return useRoutes([
    { path: ROUTE_CONSTANT.REGISTER, element: <Register /> },
    { path: ROUTE_CONSTANT.LOGIN, element: <Login /> },
    {
      element: <PrivateRoutes />,
      children: [
        { path: ROUTE_CONSTANT.HOME, element: <Dashboard /> }
      ]
    }
  ]);
};

export default Router;
