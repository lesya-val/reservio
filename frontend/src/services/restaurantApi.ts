const BASE_URL = "http://localhost:3000";

export const fetchRestaurants = async () => {
  const response = await fetch(`${BASE_URL}/restaurants`);
  if (!response.ok) {
    throw new Error(`Ошибка при получении ресторанов: ${response.statusText}`);
  }
  return response.json();
};

export const deleteRestaurant = async (id: number) => {
  const response = await fetch(`${BASE_URL}/restaurants/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Ошибка при удалении ресторана: ${response.statusText}`);
  }
  return response.json();
};
