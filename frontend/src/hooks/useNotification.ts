import { reactive } from "vue";

export interface NotificationState {
  isVisible: boolean;
  type: "error" | "success";
  message: string;
}

export const useNotification = () => {
  const notification = reactive<NotificationState>({
    isVisible: false,
    type: "error",
    message: "",
  });

  const showNotification = (
    message: string,
    type: "error" | "success" = "error"
  ) => {
    notification.isVisible = false;
    notification.type = type;
    notification.message = message;
    setTimeout(() => {
      notification.isVisible = true;
    }, 0);
  };

  const hideNotification = () => {
    notification.isVisible = false;
  };

  return {
    notification,
    showNotification,
    hideNotification,
  };
};
