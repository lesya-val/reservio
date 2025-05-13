// src/hooks/useNotification.ts
import { reactive } from "vue";

export interface NotificationState {
  isVisible: boolean;
  type: "error" | "success";
  message: string;
}

const notification = reactive<NotificationState>({
  isVisible: false,
  type: "error",
  message: "",
});

const showNotification = (
  message: string,
  type: "error" | "success" = "error"
) => {
  notification.message = message;
  notification.type = type;
  notification.isVisible = true;
};

const hideNotification = () => {
  notification.isVisible = false;
};

export { notification, showNotification, hideNotification };
