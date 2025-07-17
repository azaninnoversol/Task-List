import React, { memo, useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import TaskCard from "../../../components/TaskCard/TaskCard";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../utils/routes";
import Input from "../../../components/Input/Input";
import { deleteTaskById, getTasksForUser } from "../../../firebase/taskService";
import Spin from "../../../components/Loader/Spin";
import { errorToast, successToast } from "../../../utils/toast";

function TaskList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getTasksForUser();
      setData(data);
    } catch (error) {
      errorToast("Failed to fetch tasks!");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setIsLoading(true);
    try {
      await deleteTaskById(taskId);
      successToast("Delete Task Successfully");
      await fetchData();
    } catch (error) {
      errorToast("Something went wrong please try again!");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="min-h-[70vh] w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full px-4 sm:px-20 gap-4 sm:gap-0 py-6">
        <Input
          type="search"
          placeholder="Search Task...."
          className="w-full sm:w-[300px]"
        />
        {isAuthenticated && (
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate(ROUTE.ADD_TASK)}
          >
            + Add New Task
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="fixed left-1/2 top-[40%] w-screen h-screen">
          <Spin />
        </div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-400 py-10">No tasks found.</div>
      ) : (
        <div className="flex flex-wrap items-start gap-6 gap-y-10 justify-between px-4 sm:px-20 pb-10">
          {data?.map((single) => (
            <TaskCard
              key={single.id}
              {...single}
              id={single.id}
              deleteTask={() => deleteTask(single.id)}
              onNavigate={() =>
                navigate(ROUTE.EDIT_TASK.replace(":id", single?.id))
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default memo(TaskList);
