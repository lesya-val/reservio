import { defineStore } from "pinia";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    const storedUser = localStorage.getItem("user");

    // Проверяем, что storedUser — валидный JSON
    let parsedUser = null;
    try {
      parsedUser = storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.warn("Невалидные данные в localStorage для 'user':", e);
      localStorage.removeItem("user");
    }

    return {
      user: parsedUser,
      isAuthenticated: !!parsedUser,
    };
  },

  actions: {
    async login(loginData: any, router: any) {
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          throw new Error("Ошибка авторизации");
        }

        const data = await response.json();
        this.user = data.user;

        if (this.user && this.user.role === "SYSTEM_ADMIN") {
          router.push({ name: "RestaurantList" });
        } else {
          router.push({ name: "BookingList" });
        }

        // Сохраняем только публичные данные
        localStorage.setItem("user", JSON.stringify(this.user));

        this.isAuthenticated = true;

        return true;
      } catch (error) {
        console.error("Ошибка авторизации:", error);
        return false;
      }
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("user");
    },

    updateUser(updatedUserData: Partial<any>) {
      if (this.user) {
        this.user = { ...this.user, ...updatedUserData };
        localStorage.setItem("user", JSON.stringify(this.user));
      }
    },
  },
});
