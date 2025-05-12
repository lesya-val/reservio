import { Hall } from "../types";
import apiClient from "./apiClient";

const BASE_URL = "http://localhost:3000/halls";

// Получить список всех залов ресторана
export const getHalls = async (): Promise<Hall[]> => {
  const response = await apiClient.fetchWithAuth(BASE_URL);
  if (!response.ok) {
    throw new Error("Не удалось получить список залов!");
  }
  return response.json();
};

// Получить конкретный зал по ID
export const getHallById = async (id: number): Promise<Hall> => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Не удалось найти зал!");
  }
  return response.json();
};

// Создать новый зал
export const createHall = async (data: Partial<Hall>): Promise<Hall> => {
  const response = await apiClient.fetchWithAuth(BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка при создании зала!");
  }

  return response.json();
};

// Обновить зал
export const updateHall = async (
  id: number,
  data: Partial<Hall>
): Promise<Hall> => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка при обновлении зала!");
  }

  return response.json();
};

// Удалить зал
export const deleteHall = async (id: number): Promise<void> => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Ошибка при удалении зала!");
  }

  return response.json();
};
