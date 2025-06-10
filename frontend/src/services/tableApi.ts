import { Table } from "../types/index";
import apiClient from "@/services/apiClient";

const BASE_URL = "https://reservio-backend.onrender.com/tables";

// Получить все столы
export const getTables = async (): Promise<Table[]> => {
  const response = await apiClient.fetchWithAuth(BASE_URL);
  if (!response.ok) {
    throw new Error("Не удалось загрузить столы");
  }

  return response.json();
};

// Получить стол по ID
export const getTableById = async (id: number): Promise<Table> => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Стол не найден");
  }

  return response.json();
};

// Получить стол по ID с бронированиями
export const getTableWithBookings = async (
  id: number,
  date: string
): Promise<Table> => {
  const response = await apiClient.fetchWithAuth(
    `${BASE_URL}/${id}/bookings?date=${date}`
  );
  if (!response.ok) {
    throw new Error("Не удалось получить информацию о столе");
  }
  return response.json();
};

// Добавить новый стол
export const createTable = async (data: Partial<Table>): Promise<Table> => {
  const response = await apiClient.fetchWithAuth(BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка при создании стола");
  }

  return response.json();
};

// Обновить стол
export const updateTable = async (
  id: number,
  data: Partial<Table>
): Promise<Table> => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка при обновлении стола");
  }

  return response.json();
};

// Удалить стол
export const deleteTable = async (id: number): Promise<void> => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Ошибка при удалении стола");
  }

  return response.json();
};
