import { useAuthStore } from "../stores/auth";

export const createApiClient = () => {
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
