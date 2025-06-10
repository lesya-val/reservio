<template>
  <div class="widget-iframe">
    <Widget :restaurantId="restaurantId" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Widget from "./Widget.vue";
import { useRoute } from "vue-router";

const restaurantId = ref<number | null>(null);
const route = useRoute();

onMounted(() => {
  // Получаем ID ресторана из URL параметров
  const urlQuery = route.query;
  const id = urlQuery.id;

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
