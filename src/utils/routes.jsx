import AddTask from "../container/pages/AddTask/AddTask";
import AuthForm from "../container/pages/AuthForm/AuthForm";
import TaskList from "../container/pages/TaskList/TaskList";

export const ROUTE = {
  HOME: "/",
  ADD_TASK: "/add-task",
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
  {
    key: ROUTE.HOME,
    route: ROUTE.HOME,
    element: <TaskList />,
  },
];

export const AUTHENTICATED_ROUTES = [
  {
    key: ROUTE.HOME,
    route: ROUTE.HOME,
    element: <TaskList />,
  },
  {
    key: ROUTE.ADD_TASK,
    route: ROUTE.ADD_TASK,
    element: <AddTask />,
  },
];
