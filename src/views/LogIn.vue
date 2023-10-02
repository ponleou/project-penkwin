<template>
  <div class="sign-up-container">
    <BackButton @click="$router.go(-1)" class="sign-up__back"></BackButton>
    <h1 class="sign-up__title">Log in</h1>
    <div class="sign-up__form">
      <form id="sign-up" action="">
        <input
          required
          class="sign-up__input"
          placeholder="Email"
          type="email"
        />
        <input
          required
          placeholder="Password"
          class="sign-up__input"
          type="password"
        />
      </form>
      <div class="sign-up__form__button">
        <Button
          @click="$router.push({ name: 'One Tap' })"
          form="sign-up"
          type="submit"
        >
          Log in
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import Button from "@/components/Button.vue";
import { ref } from "vue";

export default {
  components: {
    Button,
    BackButton,
  },
  setup() {
    let studentEmployer = ref(false);
    let accommodation = ref(false);
    let financialAid = ref(false);

    return {
      financialAid,
      accommodation,
      studentEmployer,
    };
  },
};
</script>

<style scoped>
.sign-up-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 1rem;
  gap: 5rem;
}
.sign-up__back {
  align-self: flex-start;
}
.sign-up__form__button {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.sign-up__form {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.radio-input {
  display: flex;
  gap: 1rem;
}
.sign-up__title {
  margin: auto 0;
}
input {
  cursor: pointer;
}
.sign-up__radio-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  margin-top: 1rem;
}

.sign-up__input {
  padding: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 1rem;
  outline: 0;
  border: rgba(0, 0, 0, 0.7) 0.2rem solid;
}
</style>
