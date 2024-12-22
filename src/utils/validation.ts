import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message:
      "Введен неверный адрес электронной почты. Проверьте корректность ввода и повторите попытку.",
  }),
  password: z
    .string()
    .regex(/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[A-Za-zА-Яа-я\d]{8,}$/, {
      message:
        "Введен неверный пароль. Проверьте корректность ввода и повторите попытку.",
    }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message:
          "Введено неверное имя пользователя.",
      }),
    email: z.string().email({
      message:
        "Введен неверный адрес электронной почты. Проверьте корректность ввода и повторите попытку.",
    }),
    password: z
      .string()
      .regex(/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[A-Za-zА-Яа-я\d]{8,}$/, {
        message:
          "Пароль должен содержать не менее 8 символов, включая хотя бы одну заглавную букву, одну строчную букву и одну цифру.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают, попробуйте ещё раз.",
    path: ["confirmPassword"],
  });
