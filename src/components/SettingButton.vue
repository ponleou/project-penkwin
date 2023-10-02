<template>
  <div>
    <button class="setting" @click="$router.push({ name: 'Settings' })">
      <Icon class="setting__icon" icon="ic:round-settings" />
    </button>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  components: {
    Icon,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.setting {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  border-radius: 100%;
  transition: all 0.2s ease-in-out;
}
.setting:hover {
  background: rgba(0, 0, 0, 0.2);
}
.setting__icon {
  width: 2rem;
  height: 2rem;
}
</style>

<style></style>
