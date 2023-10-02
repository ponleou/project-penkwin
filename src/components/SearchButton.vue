<template>
  <button class="button">
    <slot class="button__text"></slot>
    <Icon class="icon" icon="material-symbols:search" />
  </button>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
  props: {
    secondary: Boolean,
  },

  setup() {
    return {};
  },
};
</script>

<style scoped>
.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5rem;
  width: 100%;
  padding: 1rem 2rem;
  transition: all 0.2s ease-in-out;
  background: rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
}

.icon {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
