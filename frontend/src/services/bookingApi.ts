import { Booking } from "../types/index";
import apiClient from "./apiClient";

const BASE_URL = "https://reservio-backend.onrender.com/bookings";

// Получить список всех бронирований
export const getBookings = async (): Promise<Booking[]> => {
  const response = await apiClient.fetchWithAuth(BASE_URL);
  if (!response.ok) {
    throw new Error("Не удалось получить список бронирований!");
  }
  return response.json();
};

// Получить конкретное бронирование по ID
export const getBookingById = async (id: number): Promise<Booking> => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Не удалось найти бронирование!");
  }
  return response.json();
};

// Создать новое бронирование
export const createBooking = async (
  data: Partial<Booking>
): Promise<Booking> => {
  const response = await apiClient.fetchWithAuth(BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка при создании бронирования!");
  }

  return response.json();
};

// Обновить бронирование
export const updateBooking = async (
  id: number,
  data: Partial<Booking>
): Promise<Booking> => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка при обновлении бронирования!");
  }

  return response.json();
};

// Удалить бронирование
export const deleteBooking = async (id: number): Promise<void> => {
  const response = await apiClient.fetchWithAuth(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Ошибка при удалении бронирования!");
  }
};
