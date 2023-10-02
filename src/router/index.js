import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TransitsMap from "../views/TransitsMap";
import OneTapHome from "../views/OneTapHome";
import OneTap from "../views/OneTap";
import StartRide from "../views/StartRide";
import OneTapSettings from "../views/OneTapSettings";
import SignUp from "../views/SignUp";
import LogIn from "../views/LogIn";

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  {
    path: "/one-tap",
    name: "One Tap",
    component: OneTap,
  },
  {
    path: "/one-tap-settings",
    name: "Settings",
    component: OneTapSettings,
  },
  {
    path: "/",
    name: "Home",
    component: OneTapHome,
  },
  {
    path: "/transits-map",
    name: "Transits Map",
    component: TransitsMap,
  },
  {
    path: "/start-ride",
    name: "Start Ride",
    component: StartRide,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "/long-in",
    name: "Log In",
    component: LogIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
