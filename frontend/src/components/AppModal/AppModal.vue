<template>
  <div class="modal">
    <div class="modal__box">
      <header class="modal__title">
        <slot name="title" />
        <slot name="subtitle" />
      </header>

      <section class="modal__content">
        <div class="modal__inputs">
          <slot name="inputs" />
        </div>

        <footer class="modal__buttons">
          <slot name="buttons" />
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "./AppModal";
</style>
