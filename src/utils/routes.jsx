import TaskList from "../container/pages/TaskList/TaskList";

export const ROUTE = {
  HOME: "/",
};

export const AUTHENTICATED_ROUTES = [
  {
    key: ROUTE.HOME,
    route: ROUTE.HOME,
    element: <TaskList />,
  },
];
