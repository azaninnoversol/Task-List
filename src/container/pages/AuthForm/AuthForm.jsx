import React, { memo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { STORAGE_KEYS, useLocalStorage } from "../../../hooks/localstorage";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../utils/routes";

function AuthForm() {
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [, setToken] = useLocalStorage(STORAGE_KEYS.TOKEN);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const fakeToken = `user-${data.username}-${Date.now()}`;
    setToken(fakeToken);
    reset();
    navigate(ROUTE.HOME);
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
          className="max-w-4xl w-4xl mt-10 p-6 rounded-xl bg-[var(--color-card)] text-[var(--color-text)] border border-[var(--color-border-soft)] shadow-lg space-y-4"
        >
          <h2 className="text-2xl font-semibold mb-4">Login</h2>

          <Input
            type="text"
            label="Username"
            placeholder="Enter Your Name"
            {...methods.register("username")}
          />

          <Input
            type="email"
            label="Email"
            placeholder="Enter Your Email"
            {...methods.register("email")}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter Password"
            {...methods.register("password")}
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

export default memo(AuthForm);
