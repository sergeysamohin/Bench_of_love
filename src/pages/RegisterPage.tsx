import { Link, Navigate } from "react-router";
import { Button, Input, Title } from "../components";
import { useState } from "react";
import { API } from "../api";
import { registerSchema } from "../utils/validation";
import { ZodError } from "zod";
import { LoadingIcon } from "../components/icons";
import ReCAPTCHA from "react-google-recaptcha";
import { StorageController } from "../data";

const ERRORS_REGISTER = {
  "Failed to fetch": "Произошла ошибка с сервером",
  "Default error": "Произошла ошибка",
};

export function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [totalError, setTotalError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setTotalError("");
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const register = async () => {
      if (totalError || Object.values(errors).some((x) => x)) {
        return;
      }

      try {
        const formForFetch = {
          name: form.name,
          email: form.email,
          password: form.password,
        };
        registerSchema.parse(form);
        setLoading(true);
        const data = await API.register(formForFetch);
        StorageController.setUser(data.user)
        setRedirect(true);
      } catch (error) {
        setLoading(false);

        if (error instanceof ZodError) {
          const formattedErrors = error.flatten().fieldErrors as Partial<
            typeof errors
          >;
          setErrors({
            name: formattedErrors.name ?? "",
            email: formattedErrors.email ?? "",
            password: formattedErrors.password ?? "",
            confirmPassword: formattedErrors.confirmPassword ?? "",
          });
          return;
        }

        if (error instanceof Error) {
          const key = error.message as keyof typeof ERRORS_REGISTER;
          setTotalError(
            ERRORS_REGISTER[key] ?? ERRORS_REGISTER["Default error"]
          );
        }
      }
    };

    register();
  };

  if (redirect) {
    return <Navigate to="/stories" replace />;
  }

  return (
    <div className="h-screen py-16 flex flex-col items-center justify-center gap-8">
      <Title variant="center">Регистрация</Title>
      <div className="flex flex-col gap-2 px-4 w-full">
        <form className="flex flex-col gap-2 p-4 pt-8 w-full bg-white border border-secondary rounded-xl">
          <Input
            errorMessage={errors.name}
            placeholder="имя пользователя"
            name="name"
            onChange={handleChange}
          />
          <Input
            errorMessage={errors.email}
            placeholder="электронная почта"
            name="email"
            onChange={handleChange}
          />
          <Input
            errorMessage={errors.password}
            placeholder="пароль"
            name="password"
            onChange={handleChange}
          />
          <Input
            errorMessage={errors.confirmPassword}
            placeholder="подтверждение пароля"
            name="confirmPassword"
            onChange={handleChange}
          />
          <ReCAPTCHA
            className="mx-auto"
            sitekey="6LdbppsqAAAAAFvlYDeJmOtoX2n0T_BV9MnKwQlt"
            onChange={(captcha) => setCaptcha(captcha)}
          />
          <Button
            className="mt-2 self-center"
            onClick={handleClick}
            disabled={!captcha}
          >
            Войти
          </Button>
          {totalError && (
            <p className="text-sm text-primary text-center">{totalError}</p>
          )}
          {loading && (
            <LoadingIcon className="w-4 h-4 fill-primary text-secondary mx-auto" />
          )}
        </form>
        <p className="text-center font-thin">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="font-normal text-primary">
            Войдите!
          </Link>
        </p>
      </div>
    </div>
  );
}
