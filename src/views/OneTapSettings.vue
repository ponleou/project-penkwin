<template>
  <div class="flex-container">
    <BackButton @click="$router.go(-1)"></BackButton>
    <div class="page-container">
      <div class="body">
        <h1>Settings</h1>
        <div class="body__settings">
          <div class="settings-container">
            <label class="setting-label" for="visual-aid-checkbox">
              <h3>Enable Visual Aid</h3>
              <p class="info">
                Makes texts bigger and increases display scaling for better
                visibility
              </p>
            </label>
            <input
              v-model="visualAidSetting"
              class="checkbox"
              type="checkbox"
              id="visual-aid-checkbox"
            />
          </div>
          <div class="settings-container">
            <label class="setting-label" for="visual-aid-checkbox">
              <h3>Notifications</h3>
              <p class="info">Allows push notifications</p>
            </label>
            <input
              v-model="notificationSetting"
              class="checkbox"
              type="checkbox"
              id="visual-aid-checkbox"
            />
          </div>
        </div>
      </div>
      <div class="save-button">
        <Button @click="saveSettings">Save settings</Button>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import Button from "@/components/Button.vue";
import { onMounted, ref } from "vue";

export default {
  components: {
    BackButton,
    Button,
  },

  setup() {
    let visualAidSetting = ref(false);
    let notificationSetting = ref(true);

    function saveSettings() {
      if (visualAidSetting.value) {
        document.getElementsByTagName("html")[0].style.fontSize = "90%";
      }
      if (!visualAidSetting.value) {
        console.log("ran");
        document.getElementsByTagName("html")[0].style.fontSize = "62.5%";
      }
    }

    return {
      visualAidSetting,
      notificationSetting,
      saveSettings,
    };
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.page-container {
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.settings-container {
  padding: 2rem 1rem 1rem;
  display: flex;
  justify-content: space-between;
}

.checkbox-container {
  max-width: 5rem;
}

input.checkbox {
  max-width: 3rem;
  width: 2.5rem;
  accent-color: black;
}

.info {
  font-size: 1rem;
  font-weight: normal;
}

.setting-label {
  max-width: 90%;
}
</style>
