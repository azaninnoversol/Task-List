import React, { memo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

function AddTask() {
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    console.log("✅ Task Submitted:", data);
    reset();
  };

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
          <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>

          <Input
            type="text"
            label="Task"
            placeholder="Task title"
            {...methods.register("task")}
          />

          <Input
            type="textarea"
            label="Problem"
            placeholder="Describe the issue..."
            {...methods.register("problem")}
          />

          <Input
            type="text"
            label="Time Taken"
            placeholder="e.g. 1h 30m"
            {...methods.register("time")}
          />

          <Input
            type="url"
            label="Solution Link"
            placeholder="https://..."
            {...methods.register("solution")}
          />

          <Input type="date" label="Date" {...methods.register("date")} />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={() => reset()}
              className="border border-[var(--color-border)] hover:bg-[var(--color-border)]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[var(--color-accent)] text-white hover:opacity-90"
            >
              Submit
            </Button>
          </div>
        </motion.form>
      </section>
    </FormProvider>
  );
}

export default memo(AddTask);
