import React, { memo } from "react";
import Button from "../../../components/Button/Button";
import TaskCard from "../../../components/TaskCard/TaskCard";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../utils/routes";
import Input from "../../../components/Input/Input";

function TaskList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token);

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

      <div className="flex flex-wrap items-start gap-6 gap-y-10 justify-between px-4 sm:px-20 pb-10">
        {[...Array(10)].map((_, index) => (
          <TaskCard key={index} />
        ))}
      </div>
    </section>
  );
}

export default memo(TaskList);
