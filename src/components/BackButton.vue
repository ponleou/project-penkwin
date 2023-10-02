<template>
  <button class="container">
    <Icon class="icon" icon="ic:round-chevron-left" />
    <p class="text">Back</p>
  </button>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  components: {
    Icon,
  },
  props: {
    link: String,
  },
};
</script>

<style scoped>
.container {
  /* padding: 1rem 1rem 0; */
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.icon {
  width: 3rem;
  height: 3rem;
}
</style>
