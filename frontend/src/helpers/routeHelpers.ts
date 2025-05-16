import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";
import { useRoute } from "vue-router";

// Утилита для проверки, находится ли пользователь в режиме создания
export const isCreateMode = () => {
  const route = useRoute();
  return computed(() => route.params.id === "create");
};

export const userRole = () => {
  const authStore = useAuthStore();
  return authStore?.user?.role;
};
