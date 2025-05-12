import { useAuthStore } from "../stores/auth";

export const createApiClient = () => {
  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...(options.headers || {}),
      },
    });

    if (response.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
    }

    return response;
  };

  return { fetchWithAuth };
};

export default createApiClient();
