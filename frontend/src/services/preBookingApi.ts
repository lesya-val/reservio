const BASE_URL = "https://reservio-backend.onrender.com/pre-bookings";

export const getPendingRequests = async (restaurantId: number) => {
  const response = await fetch(`${BASE_URL}?restaurantId=${restaurantId}`);
  return await response.json();
};

export const acceptPreBooking = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}/accept`, {
    method: "POST",
  });
  return await response.json();
};

export const rejectPreBooking = async (request: { id: number }) => {
  const response = await fetch(`${BASE_URL}/${request.id}/reject`, {
    method: "POST",
  });
  return await response.json();
};

export const createPreBooking = async (
  restaurantId: number,
  data: {
    name: string;
    phone: string;
    email?: string;
    guestsCount: number;
    dateTime: string;
    notes?: string;
  }
) => {
  const response = await fetch(`${BASE_URL}?restaurantId=${restaurantId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
