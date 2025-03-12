<template>
  <v-default>
    <ListControls :title="'Управление ресторанами'" />
    <AppTable :cols="tableCols" :data="data" class="list-page" />
  </v-default>
</template>

<script setup>
import AppTable from "../../components/AppTable/AppTable.vue";
import VDefault from "../../components/DefaultLayout/DefaultLayout.vue";
import ListControls from "../../components/ListControls/ListControls.vue";
import tableCols from "./tableCols";

const data = [
  {
    index: 1,
    restaurantName: "Ресторан Вкусно",
    address: "ул. Пушкина, д. 10",
    contactPhone: "+7 (999) 123-45-67",
    workingHours: "10:00 - 22:00",
    status: "Открыт",
  },
  {
    index: 2,
    restaurantName: "Пицца & Компания",
    address: "ул. Ленина, д. 5",
    contactPhone: "+7 (999) 234-56-78",
    workingHours: "11:00 - 23:00",
    status: "Закрыт",
  },
  {
    index: 3,
    restaurantName: "Суши Time",
    address: "пр-т Мира, д. 25",
    contactPhone: "+7 (999) 345-67-89",
    workingHours: "12:00 - 00:00",
    status: "Открыт",
  },
  {
    index: 4,
    restaurantName: "Бургер Хаус",
    address: "ул. Советская, д. 15",
    contactPhone: "+7 (999) 456-78-90",
    workingHours: "09:00 - 21:00",
    status: "Открыт",
  },
  {
    index: 5,
    restaurantName: "Кофейня Relax",
    address: "пл. Центральная, д. 3",
    contactPhone: "+7 (999) 567-89-01",
    workingHours: "08:00 - 20:00",
    status: "Открыт",
  },
  {
    index: 6,
    restaurantName: "Стейкхаус Prime",
    address: "ул. Садовая, д. 7",
    contactPhone: "+7 (999) 678-90-12",
    workingHours: "17:00 - 01:00",
    status: "Открыт",
  },
  {
    index: 7,
    restaurantName: "Итальянский дворик",
    address: "ул. Березовая, д. 12",
    contactPhone: "+7 (999) 789-01-23",
    workingHours: "12:00 - 23:00",
    status: "Закрыт",
  },
  {
    index: 8,
    restaurantName: "Мексиканская таверна",
    address: "ул. Лесная, д. 8",
    contactPhone: "+7 (999) 890-12-34",
    workingHours: "13:00 - 00:00",
    status: "Открыт",
  },
  {
    index: 9,
    restaurantName: "Японский дом",
    address: "ул. Речная, д. 18",
    contactPhone: "+7 (999) 901-23-45",
    workingHours: "11:00 - 22:00",
    status: "Открыт",
  },
  {
    index: 10,
    restaurantName: "Французская кухня",
    address: "ул. Цветочная, д. 5",
    contactPhone: "+7 (999) 012-34-56",
    workingHours: "18:00 - 23:00",
    status: "Закрыт",
  },
  {
    index: 11,
    restaurantName: "Барбекю Point",
    address: "ул. Парковая, д. 14",
    contactPhone: "+7 (999) 123-45-67",
    workingHours: "10:00 - 22:00",
    status: "Открыт",
  },
  {
    index: 12,
    restaurantName: "Тайский оазис",
    address: "ул. Вокзальная, д. 9",
    contactPhone: "+7 (999) 234-56-78",
    workingHours: "11:00 - 23:00",
    status: "Открыт",
  },
  {
    index: 13,
    restaurantName: "Морской бриз",
    address: "наб. Речная, д. 3",
    contactPhone: "+7 (999) 345-67-89",
    workingHours: "12:00 - 00:00",
    status: "Открыт",
  },
  {
    index: 14,
    restaurantName: "Пивной дом",
    address: "ул. Промышленная, д. 11",
    contactPhone: "+7 (999) 456-78-90",
    workingHours: "16:00 - 01:00",
    status: "Открыт",
  },
  {
    index: 15,
    restaurantName: "Китайский экспресс",
    address: "ул. Городская, д. 22",
    contactPhone: "+7 (999) 567-89-01",
    workingHours: "10:00 - 22:00",
    status: "Закрыт",
  },
  {
    index: 16,
    restaurantName: "Грузинский уголок",
    address: "ул. Солнечная, д. 6",
    contactPhone: "+7 (999) 678-90-12",
    workingHours: "11:00 - 23:00",
    status: "Открыт",
  },
  {
    index: 17,
    restaurantName: "Американское меню",
    address: "ул. Зеленая, д. 19",
    contactPhone: "+7 (999) 789-01-23",
    workingHours: "12:00 - 00:00",
    status: "Открыт",
  },
  {
    index: 18,
    restaurantName: "Домашняя кухня",
    address: "ул. Тихая, д. 4",
    contactPhone: "+7 (999) 890-12-34",
    workingHours: "09:00 - 21:00",
    status: "Открыт",
  },
  {
    index: 19,
    restaurantName: "Караоке бар",
    address: "ул. Клубная, д. 13",
    contactPhone: "+7 (999) 901-23-45",
    workingHours: "18:00 - 02:00",
    status: "Открыт",
  },
  {
    index: 20,
    restaurantName: "Европейский стиль",
    address: "ул. Архитектурная, д. 8",
    contactPhone: "+7 (999) 012-34-56",
    workingHours: "10:00 - 22:00",
    status: "Закрыт",
  },
];
</script>

<style scoped lang="scss">
@import "./RestaurantListPage.scss";
</style>
