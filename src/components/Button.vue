<template>
  <button
    class="button"
    :class="[
      { 'button-secondary': secondary },
      { 'button-primary': !secondary },
      { 'button-disabled': isDisabled },
      { 'button-primary-size': isPrimarySize },
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    secondary: Boolean,
    isDisabled: Boolean,
    isPrimarySize: Boolean,
  },

  setup() {
    return {};
  },
};
</script>

<style scoped>
.button-primary {
  background-color: black;
  padding: 1.5rem 1rem;
  font-weight: 500;
  color: white;
  border: 0;
}

.button-secondary.button-primary-size {
  font-size: 1.5rem;
  padding: 1.3rem 1rem;
}
.button-primary:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.button-secondary {
  border: black 0.2rem solid;
  padding: 0.5rem 0.5rem;
  font-size: 1.2rem;
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
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.button-disabled {
  background-color: grey;
  cursor: not-allowed;
}

.button-disabled:hover {
  background-color: grey;
}
</style>
