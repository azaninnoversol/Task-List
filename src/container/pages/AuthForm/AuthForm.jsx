import React, { memo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import {
  getFromLocalStorage,
  saveInLocalStorge,
  STORAGE_KEYS,
  useLocalStorage,
} from "../../../hooks/localstorage";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../../../utils/routes";
import TokenGenerator from "../../../utils/constant";
import { errorToast, successToast } from "../../../utils/toast";

function AuthForm() {
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = methods;
  const [, setToken] = useLocalStorage(STORAGE_KEYS.TOKEN);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isRegister = pathname === ROUTE.REGISTER;
  const password = watch("password", "");

  const rules = {
    username: { required: "Username is required" },
    email: {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
    c_password: {
      required: "Confirm Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
      validate: (value) => value === password || "Passwords do not match",
    },
  };

  const onSubmit = (data) => {
    if (isRegister) {
      saveInLocalStorge("AuthForm", {
        ...data,
      });

      successToast("User registered successfully!");
      const token = TokenGenerator();
      setToken(token);
      reset();
      navigate(ROUTE.HOME);
    } else {
      const getData = getFromLocalStorage("AuthForm");

      if (getData) {
        const isValidUser =
          getData.username === data.username &&
          getData.email === data.email &&
          getData.password === data.password;

        if (isValidUser) {
          const token = TokenGenerator();
          setToken(token);
          successToast("Login successful!");
          reset();
          navigate(ROUTE.HOME);
        } else {
          errorToast("Invalid credentials!");
        }
      } else {
        errorToast("No user found. Please register first.");
      }
    }
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
          <h2 className="text-2xl font-semibold mb-4">
            {isRegister ? "Register" : "Login"}
          </h2>

          <Input
            type="text"
            label="Username"
            placeholder="Enter Your Name"
            {...methods.register("username", rules.username)}
            errors={errors.username?.message}
          />

          <Input
            type="email"
            label="Email"
            placeholder="Enter Your Email"
            {...methods.register("email", rules.email)}
            errors={errors.email?.message}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter Password"
            {...methods.register("password", rules.password)}
            errors={errors.password?.message}
          />

          {isRegister && (
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Enter Confirm Password"
              {...methods.register("c_password", rules.c_password)}
              errors={errors.c_password?.message}
            />
          )}

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
