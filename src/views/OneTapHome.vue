<template>
  <div class="sign-up">
    <!-- <OneTapLogo></OneTapLogo> -->
    <SettingButton class="home-setting"></SettingButton>
    <div class="title-container">
      <Icon class="title-icon" icon="mingcute:finger-tap-line" />
      <h1 class="title">One Tap</h1>
      <p class="title-moto">The One Solution</p>
    </div>
    <div class="button__container">
      <Button @click="$router.push({ name: 'Sign Up' })" class="margin-bottom"
        >Sign up</Button
      >
      <Button
        @click="$router.push({ name: 'Log In' })"
        class="margin-bottom"
        secondary="true"
        isPrimarySize="true"
        >Log in</Button
      >
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import OneTapLogo from "@/components/OneTapLogo.vue";
import SettingButton from "@/components/SettingButton.vue";
import { Icon } from "@iconify/vue";

export default {
  components: {
    OneTapLogo,
    Button,
    Icon,
    SettingButton,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 1rem;
}
.home-setting {
  align-self: flex-end;
}

.title-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title-icon {
  width: 8rem;
  height: 8rem;
  margin-bottom: 1.5rem;
  color: rgba(0, 0, 0, 0.5);
}

.title-moto {
  letter-spacing: 0.5rem;
  color: rgba(0, 0, 0, 0.5);
}
.sign-up {
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.margin-bottom {
  margin-bottom: 1rem;
}

.button__container {
  padding: 1rem;
  bottom: 0;
}
</style>
