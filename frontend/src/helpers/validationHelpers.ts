import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
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

// Утилита для проверки номера телефона
export const validPhone = (message: string = "Некорректный номер телефона") =>
  helpers.withMessage(message, (value: string) => {
    if (!value) return true;
    return isMobilePhone(value, "ru-RU");
  });
