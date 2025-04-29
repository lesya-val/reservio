// frontend/src/services/userApi.ts
import { User } from "../types/index";
import apiClient from "./apiClient";

const BASE_URL = "http://localhost:3000/restaurants";

// Получить список всех сотрудников ресторана
export const getEmployeesByRestaurantId = async (
  restaurantId: number
): Promise<User[]> => {
  const response = await apiClient.fetchWithAuth(
    `${BASE_URL}/${restaurantId}/employees`
  );
  if (!response.ok) {
    throw new Error("Не удалось получить список сотрудников ресторана!");
  }
  return response.json();
};

// Получить конкретного сотрудника ресторана
export const getEmployeeById = async (
  restaurantId: number,
  employeeId: number
): Promise<User> => {
  const response = await apiClient.fetchWithAuth(
    `${BASE_URL}/${restaurantId}/employees/${employeeId}`
  );
  if (!response.ok) {
    throw new Error("Не удалось найти сотрудника!");
  }
  return response.json();
};

// Создать нового сотрудника
export const createEmployee = async (
  restaurantId: number,
  data: Partial<User>
): Promise<User> => {
  const response = await apiClient.fetchWithAuth(
    `${BASE_URL}/${restaurantId}/employees`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Ошибка при создании сотрудника!");
  }
  return response.json();
};

// Обновить сотрудника
export const updateEmployee = async (
  restaurantId: number,
  employeeId: number,
  data: Partial<User>
): Promise<User> => {
  const response = await apiClient.fetchWithAuth(
    `${BASE_URL}/${restaurantId}/employees/${employeeId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Ошибка при обновлении сотрудника!");
  }
  return response.json();
};

// Удалить сотрудника
export const deleteEmployee = async (
  restaurantId: number,
  employeeId: number
): Promise<void> => {
  const response = await apiClient.fetchWithAuth(
    `${BASE_URL}/${restaurantId}/employees/${employeeId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Ошибка при удалении сотрудника!");
  }
};

// Изменить пароль
export const changePassword = async (
  restaurantId: number,
  userId: number,
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  const response = await apiClient.fetchWithAuth(
    `${BASE_URL}/${restaurantId}/employees/${userId}/change-password`,
    {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword }),
    }
  );
  if (!response.ok) {
    throw new Error("Ошибка при изменении пароля!");
  }
  return response.json();
};
