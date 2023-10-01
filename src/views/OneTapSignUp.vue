<template>
  <div class="sign-up">
    <!-- <OneTapLogo></OneTapLogo> -->
    <h1 class="title">One Tap</h1>
    <div class="button__container">
      <Button class="margin-bottom">Sign In</Button>
      <Button class="margin-bottom" secondary="true">Log In</Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import OneTapLogo from "@/components/OneTapLogo.vue";

export default {
  components: {
    OneTapLogo,
    Button,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.title {
  font-size: 5rem;
  text-align: center;
}
.sign-up {
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.margin-bottom {
  margin-bottom: 1rem;
}

.button__container {
  padding: 1rem;
  bottom: 0;
}
</style>
