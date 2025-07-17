import React, { memo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { STORAGE_KEYS, useLocalStorage } from "../../../hooks/localstorage";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../../../utils/routes";
import { errorToast, successToast } from "../../../utils/toast";
import { registerUser, loginUser } from "../../../firebase/authService";

function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let res;
      if (isRegister) {
        const { email, username, password } = data;
        res = await registerUser({ email, name: username, password });

        if (res?.accessToken) {
          successToast("User registered successfully!");
          setToken(res?.accessToken);
          reset();
          navigate(ROUTE.HOME);
        } else {
          errorToast(res?.error || res?.error?.message || "Please Try Again!");
        }
      } else {
        res = await loginUser({ email: data.email, password: data.password });

        if (res?.accessToken) {
          successToast("Login successful!");
          setToken(res?.accessToken);
          reset();
          navigate(ROUTE.HOME);
        } else {
          errorToast(res?.error || res?.error?.message || "Please Try Again!");
        }
      }
    } catch (error) {
      setIsLoading(false);
      errorToast("Something went wrong!");
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
              className={`bg-[var(--color-accent)] text-white ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </motion.form>
      </section>
    </FormProvider>
  );
}

export default memo(AuthForm);
