import Auth from "layouts/auth";
import Home from "layouts/home";

const publicRoute = [
  {
    route: "/login",
    component: <Auth />,
  },
  {
    route: "/register",
    component: <Auth />,
  },
];

const authRoute = [
  {
    route: "/",
    component: <Home />,
  },
];

export { publicRoute, authRoute };
