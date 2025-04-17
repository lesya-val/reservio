import { Employee } from "../types";

const BASE_URL = "http://localhost:3000/restaurants";

// Получить список всех сотрудников ресторана
export const getEmployeesByRestaurantId = async (
  restaurantId: number
): Promise<Employee[]> => {
  const response = await fetch(`${BASE_URL}/${restaurantId}/employees`);
  if (!response.ok) {
    throw new Error("Не удалось получить список сотрудников ресторана!");
  }
  return response.json();
};

// Получить конкретного сотрудника ресторана
export const getEmployeeById = async (
  restaurantId: number,
  employeeId: number
): Promise<Employee> => {
  const response = await fetch(
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
  data: Partial<Employee>
): Promise<Employee> => {
  const response = await fetch(`${BASE_URL}/${restaurantId}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Ошибка при создании сотрудника!");
  }
  return response.json();
};

// Обновить сотрудника
export const updateEmployee = async (
  restaurantId: number,
  employeeId: number,
  data: Partial<Employee>
): Promise<Employee> => {
  const response = await fetch(
    `${BASE_URL}/${restaurantId}/employees/${employeeId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
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
  const response = await fetch(
    `${BASE_URL}/${restaurantId}/employees/${employeeId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Ошибка при удалении сотрудника!");
  }
};
