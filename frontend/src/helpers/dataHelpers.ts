// Утилита для удаления пустых значений из объекта
export const cleanData = <T extends object>(data: T): T => {
  const cleanedData: Partial<T> = {};

  for (const key in data) {
    const value = data[key];
    if (value) {
      cleanedData[key] = value;
    }
  }

  return cleanedData as T;
};
