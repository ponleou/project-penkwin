<template>
  <div class="container">
    <div class="logo">One Tap</div>
    <SettingButton></SettingButton>
  </div>
</template>

<script>
import SettingButton from "./SettingButton.vue";

export default {
  components: {
    SettingButton,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
.logo {
  font-weight: bold;
  font-size: 3rem;
  width: 100%;
}
</style>
