// frontend/src/services/restaurantApi.ts
import { Restaurant } from "../types";
import apiClient from "./apiClient";

const BASE_URL = "http://localhost:3000/restaurants";

// Получить список всех ресторанов
export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await apiClient.fetchWithAuth(BASE_URL);
  if (!response.ok) {
    throw new Error("Не удалось получить список ресторанов!");
  }
  return response.json();
};

// Получить конкретный ресторан по ID
export const getRestaurantById = async (id: number): Promise<Restaurant> => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Не удалось найти ресторан!");
  }
  return response.json();
};

// Создать новый ресторан
export const createRestaurant = async (
  data: Partial<Restaurant>
): Promise<Restaurant> => {
  const response = await apiClient.fetchWithAuth(BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка при создании ресторана!");
  }

  return response.json();
};

// Обновить ресторан
export const updateRestaurant = async (
  id: number,
  data: Partial<Restaurant>
): Promise<Restaurant> => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка при обновлении ресторана!");
  }

  return response.json();
};

// Удалить ресторан
export const deleteRestaurant = async (id: number) => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Ошибка при удалении ресторана!");
  }

  return response.json();
};
