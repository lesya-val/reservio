// Утилита для получения первого сообщения об ошибке
export const getErrorMessage = (field: any) => {
  return field?.$errors[0]?.$message || null;
};
