const BASE_URL = "http://localhost:3000/pre-bookings";

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
