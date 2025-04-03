<template>
  <div class="search">
    <AppIcon class="search__icon" value="search" width="24px" height="24px" />
    <AppInput
      class="search__input"
      :value="searchValue"
      :view="'text'"
      :placeholder="'Поиск'"
      @input="onSearchChange"
    >
    </AppInput>
  </div>
</template>

<script setup>
import AppIcon from "../AppIcon/AppIcon.vue";
import AppInput from "../AppInput/AppInput.vue";
</script>

<style lang="scss" src="./Search.scss"></style>
