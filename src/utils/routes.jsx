import AddTask from "../container/pages/AddTask/AddTask";
import AuthForm from "../container/pages/AuthForm/AuthForm";
import Profile from "../container/pages/Profile/Profile";

export const ROUTE = {
  HOME: "/",
  ADD_TASK: "/task/add-task",
  EDIT_TASK: "/task/edit-task/:id",
  PROFIlE: "/profile",
  REGISTER: "/register",
  LOGIN: "/login",
};

export const UN_AUTHENTICATED_ROUTES = [
  {
    key: ROUTE.REGISTER,
    route: ROUTE.REGISTER,
    element: <AuthForm />,
  },
  {
    key: ROUTE.LOGIN,
    route: ROUTE.LOGIN,
    element: <AuthForm />,
  },
];

export const AUTHENTICATED_ROUTES = [
  {
    key: ROUTE.ADD_TASK,
    route: ROUTE.ADD_TASK,
    element: <AddTask />,
  },
  {
    key: ROUTE.EDIT_TASK,
    route: ROUTE.EDIT_TASK,
    element: <AddTask />,
  },
  {
    key: ROUTE.PROFIlE,
    route: ROUTE.PROFIlE,
    element: <Profile />,
  },
];
