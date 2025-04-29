import * as bcrypt from "bcrypt";

export const generateTemporaryPassword = (): string => {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialChars = '!@#$%^&*(),.?":{}|<>';

  // Вспомогательная функция для выбора случайного символа
  const getRandomChar = (pool: string): string => {
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
  };

  // Гарантированно добавляем одну цифру и один специальный символ
  const requiredDigit = getRandomChar(digits);
  const requiredSpecialChar = getRandomChar(specialChars);

  const remainingLength = 6;
  const randomLetters = Array.from({ length: remainingLength }, () =>
    getRandomChar(letters)
  );

  const allChars = [...randomLetters, requiredDigit, requiredSpecialChar];

  // Перемешиваем символы
  const shuffledChars = allChars.sort(() => Math.random() - 0.5);

  return shuffledChars.join("");
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
