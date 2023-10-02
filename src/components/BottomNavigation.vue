<template>
  <nav class="navigation">
    <button
      @click="$router.push({ name: 'One Tap' })"
      class="nav__button"
      :disabled="isOneTap"
      :class="{ active: isOneTap }"
    >
      <Icon class="icon" icon="mingcute:finger-tap-line" />
      <p>One Tap</p>
    </button>
    <button
      @click="$router.push({ name: 'Home' })"
      class="nav__button"
      :disabled="isAccount"
      :class="{ active: isAccount }"
    >
      <Icon class="icon" icon="mdi:account" />
      <p>Account</p>
    </button>
  </nav>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  props: {
    isOneTap: Boolean,
    isAccount: Boolean,
  },
  components: {
    Icon,
  },
};
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: space-between;
}

.icon {
  width: 3rem;
  height: 3rem;
}

.nav__button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-top: 0.2rem rgba(0, 0, 0, 0.3) solid;
  transition: all 0.2s ease-in-out;
  opacity: 0.5;
}

.nav__button:hover {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
  opacity: 1;
}

.active.nav__button {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
  color: black;
}
</style>
