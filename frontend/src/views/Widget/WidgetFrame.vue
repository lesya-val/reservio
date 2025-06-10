<template>
  <div class="widget-iframe">
    <Widget :restaurantId="restaurantId" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Widget from "./Widget.vue";

const restaurantId = ref<number | null>(null);

onMounted(() => {
  // Получаем ID ресторана из URL параметров
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id) {
    restaurantId.value = parseInt(id);
  }
});
</script>

<style scoped>
.widget-iframe {
  width: 100%;
  min-height: 100vh;
  border: none;
}
</style>
