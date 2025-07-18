import React, { memo, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { rules } from "../../../utils/constant";
import { errorToast, successToast } from "../../../utils/toast";
import {
  addTaskToFirestore,
  getTaskById,
  updateTaskById,
} from "../../../firebase/taskService";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE } from "../../../utils/routes";

function AddTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let res;
      if (id) {
        console.log(id, "id");
        res = await updateTaskById(id, data);
      } else {
        res = await addTaskToFirestore(data);
      }

      if (res) {
        successToast(
          id ? "Task updated successfully!" : "Task added successfully!"
        );
        navigate(ROUTE.HOME);
        reset();
      } else {
        errorToast("Something went wrong, please try again!");
      }
    } catch (error) {
      console.log(error, "error");
      errorToast("Unexpected error occurred.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTaskById = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const taskData = await getTaskById(id);
        if (taskData) {
          reset({
            task: taskData.task || "",
            problem: taskData.problem || "",
            time: taskData.time || "",
            solution: taskData.solution || "",
            date: taskData.date || "",
          });
        }
      } catch (error) {
        errorToast("Failed to load task for editing.");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTaskById();
  }, [id, reset]);

  return (
    <FormProvider {...methods}>
      <section className="flex justify-center items-center px-4">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="max-w-7xl w-7xl mt-10 p-6 rounded-xl bg-[var(--color-card)] text-[var(--color-text)] border border-[var(--color-border-soft)] shadow-lg space-y-4"
        >
          <h2 className="text-2xl font-semibold mb-4">
            {id ? "Edit New Task" : "Add New Task"}
          </h2>

          <Input
            type="text"
            label="Task"
            placeholder="Task title"
            {...methods.register("task", rules.task)}
            errors={errors.task?.message}
          />

          <Input
            type="textarea"
            label="Problem"
            placeholder="Describe the issue..."
            {...methods.register("problem", rules.problem)}
            errors={errors.problem?.message}
          />

          <Input
            type="text"
            label="Time Taken"
            placeholder="e.g. 1h 30m"
            {...methods.register("time", rules.time)}
            errors={errors.time?.message}
          />

          <Input
            type="url"
            label="Solution Link"
            placeholder="https://..."
            {...methods.register("solution", rules.solution)}
            errors={errors.solution?.message}
          />

          <Input
            type="date"
            label="Date"
            {...methods.register("date", rules.date)}
            errors={errors.date?.message}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => reset()}
              className="border border-[var(--color-border)] hover:bg-[var(--color-border)]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className={`bg-[var(--color-accent)] text-white ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {isLoading
                ? id
                  ? "Updating..."
                  : "Submitting..."
                : id
                ? "Update"
                : "Submit"}
            </Button>
          </div>
        </motion.form>
      </section>
    </FormProvider>
  );
}

export default memo(AddTask);
