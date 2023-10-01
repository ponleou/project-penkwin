import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TransitsMap from "../views/TransitsMap";
import OneTap from "../views/OneTapSignUp";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/one-tap/sign-up",
    name: "One Tap Sign Up",
    component: OneTap,
  },
  {
    path: "/transits-map",
    name: "Transits Map",
    component: TransitsMap,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
