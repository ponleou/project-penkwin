<template>
  <a
    class="button"
    :class="[
      { 'button-secondary': secondary },
      { 'button-primary': !secondary },
    ]"
    :href="link"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    link: String,
    secondary: Boolean,
  },

  setup() {
    return {};
  },
};
</script>

<style scoped>
.button-primary {
  background-color: black;
  color: white;
}

.button-primary:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.button-secondary {
  border: 0.2rem black solid;
}

.button-secondary:hover {
  background: black;
  color: white;
}

.button {
  display: inline-block;
  border-radius: 1rem;
  width: 100%;
  text-align: center;
  padding: 1.5rem 1rem;
  transition: all 0.2s ease-in-out;
}
</style>
