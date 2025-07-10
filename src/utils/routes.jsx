import AddTask from "../container/pages/AddTask/AddTask";
import TaskList from "../container/pages/TaskList/TaskList";

export const ROUTE = {
  HOME: "/",
  ADD_TASK: "/add-task",
};

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
