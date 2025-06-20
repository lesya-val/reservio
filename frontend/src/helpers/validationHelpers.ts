import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
  minValue,
} from "@vuelidate/validators";
import { isMobilePhone } from "validator";

// Утилита для создания правила "Обязательное поле"
export const requiredField = (message: string = "Обязательное поле") =>
  helpers.withMessage(message, required);

// Утилита для проверки email
export const validEmail = (message: string = "Некорректный email") =>
  helpers.withMessage(message, email);

// Утилита для проверки минимальной длины
export const minLengthRule = (min: number, message?: string) =>
  helpers.withMessage(message || `Минимум ${min} символов`, minLength(min));

// Утилита для проверки максимальной длины
export const maxLengthRule = (max: number, message?: string) =>
  helpers.withMessage(message || `Максимум ${max} символов`, maxLength(max));

// Утилита для проверки минимального значения
export const minValueRule = (min: number, message?: string) =>
  helpers.withMessage(message || `Минимум ${min}`, minValue(min));

// Утилита для проверки номера телефона
export const validPhone = (message: string = "Некорректный номер телефона") =>
  helpers.withMessage(message, (value: string) => {
    if (!value) return true;
    return isMobilePhone(value, "ru-RU");
  });

// Утилита для проверки пароля
export const validPassword = (
  message: string = "Пароль должен содержать цифру, специальный символ"
) => {
  return helpers.withMessage(message, (value: string) => {
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    return hasNumber && hasSpecial;
  });
};
