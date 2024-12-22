import { Link, Navigate } from "react-router";
import { Button, Input, Title } from "../components";
import { useState } from "react";
import { API } from "../api";
import { loginSchema } from "../utils/validation";
import { ZodError } from "zod";
import { LoadingIcon } from "../components/icons";
import ReCAPTCHA from "react-google-recaptcha";
import { StorageController } from "../data";

const ERRORS_LOGIN = {
  "Failed to fetch": "Произошла ошибка с сервером",
  "User with this email and password does not exists":
    "Пользователя с таким адресом электронной почты и паролем не существует",
  "Invalid password": "Неверный пароль",
  "Default error": "Произошла ошибка",
};

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [totalError, setTotalError] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTotalError("");
    setErrors({ ...errors, [name]: "" });
    setForm({ ...form, [name]: value });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const login = async () => {
      if (totalError || errors.email || errors.password) {
        return;
      }

      try {
        loginSchema.parse(form);
        setLoading(true);
        const user = await API.login(form);
        StorageController.setUser(user);
        setRedirect(true);
      } catch (error) {
        setLoading(false);

        if (error instanceof ZodError) {
          const formattedErrors = error.flatten().fieldErrors as Partial<
            typeof errors
          >;
          setErrors({
            email: formattedErrors.email ?? "",
            password: formattedErrors.password ?? "",
          });
          return;
        }

        if (error instanceof Error) {
          const key = error.message as keyof typeof ERRORS_LOGIN;
          setTotalError(ERRORS_LOGIN[key] ?? ERRORS_LOGIN["Default error"]);
        }
      }
    };

    login();
  };

  if (redirect) {
    return <Navigate to="/stories" replace />;
  }

  return (
    <div className="h-screen py-16 flex flex-col items-center justify-center gap-8">
      <Title variant="center">Вход</Title>
      <div className="flex flex-col gap-2 px-4 w-full">
        <form className="flex flex-col gap-2 p-4 w-full bg-white border border-secondary rounded-xl">
          <Input
            errorMessage={errors.email}
            placeholder="электронная почта"
            value={form.email}
            onChange={handleChange}
            name="email"
          />
          <Input
            errorMessage={errors.password}
            placeholder="пароль"
            value={form.password}
            onChange={handleChange}
            type="password"
            name="password"
          />
          <ReCAPTCHA
            className="mx-auto"
            sitekey="6LdbppsqAAAAAFvlYDeJmOtoX2n0T_BV9MnKwQlt"
            onChange={(captcha) => setCaptcha(captcha)}
          />
          <Button
            className="self-center"
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
          Нет аккаунта?{" "}
          <Link to="/register" className="font-normal text-primary">
            Зарегистрируйтесь!
          </Link>
        </p>
      </div>
    </div>
  );
}
