<template>
  <div class="modal">
    <div class="modal__box">
      <div class="modal__title">
        <slot name="title" />
      </div>
      <div class="modal__content">
        <div class="modal__buttons">
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@import "./AppModal";
</style>
