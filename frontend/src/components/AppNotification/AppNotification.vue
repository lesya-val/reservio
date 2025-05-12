<template>
  <div
    ref="notification"
    class="notification"
    :style="{ background: toastColor.background }"
  >
    <p class="notification__text" :style="{ color: toastColor.color }">
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
  type?: "success" | "error";
}>();

const emit = defineEmits(["close"]);

const notification = ref<HTMLElement | null>(null);

const toastColor = computed(() => {
  const colors = {
    success: { background: "#E5FFF0", color: "#17AD53" },
    error: { background: "#FCE9E9", color: "#D82222" },
  };
  return colors[props.type || "success"];
});

onMounted(() => {
  setTimeout(
    () => notification.value?.classList.add("notification--visible"),
    0
  );

  const duration = props.type === "error" ? 5000 : 2000;

  setTimeout(() => {
    notification.value?.classList.add("notification--fade-out");
    setTimeout(() => emit("close"), 500);
  }, duration);
});
</script>

<style scoped lang="scss">
@import "./AppNotification.scss";
</style>
