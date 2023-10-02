<template>
  <div class="screen">
    <OneTapLogo></OneTapLogo>
    <div class="body">
      <SearchButton @click="$router.push({ name: 'Start Ride' })">
        Find a ride with one tap
      </SearchButton>
      <div class="info-text">We will organize everything for you!</div>
      <div class="eco-banner">
        <div>
          <p class="eco-banner__text">
            We thank <em>you</em> for making the greener choice!
          </p>
          <a class="eco-banner__link" href="">Learn more</a>
        </div>
        <Icon class="eco-banner__icon" icon="game-icons:three-leaves" />
      </div>
    </div>
    <BottomNavigation isOneTap="true"></BottomNavigation>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import BottomNavigation from "@/components/BottomNavigation.vue";
import Button from "@/components/Button.vue";
import OneTapLogo from "@/components/OneTapLogo.vue";
import SearchButton from "@/components/SearchButton.vue";

export default {
  components: {
    BottomNavigation,
    OneTapLogo,
    Button,
    SearchButton,
    Icon,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.info-text {
  color: rgba(0, 0, 0, 0.5);
  font-weight: normal;
}
.screen {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.body {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  gap: 1rem;
}

.eco-banner {
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  background-color: green;
  padding: 2rem;
  border-radius: 1rem;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

.eco-banner__text {
  color: white;
}

.eco-banner__link {
  color: white;
  font-size: 1.5rem;
  text-decoration: underline;
}

.eco-banner__icon {
  width: 18rem;
  height: 8rem;
  color: white;
}
</style>
