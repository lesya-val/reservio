import { defineStore } from "pinia";

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") || "null"),
    isAuthenticated: !!localStorage.getItem("token"),
  }),

  actions: {
    async login(loginData: any, router: any) {
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Ошибка");
        }

        const data = await response.json();
        const { access_token, user } = data;

        this.token = access_token;
        this.user = user;
        this.isAuthenticated = true;

        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "SYSTEM_ADMIN") {
          await router.push({ name: "RestaurantList" });
        } else {
          await router.push({ name: "BookingListPage" });
        }

        return true;
      } catch (error) {
        console.error("Ошибка авторизации:");
        return false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
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
