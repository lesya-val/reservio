import * as bcrypt from "bcrypt";

export const generateTemporaryPassword = (): string => {
  return Math.random().toString(36).slice(-8); // Генерирует строку из 8 символов
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
