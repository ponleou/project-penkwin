<template>
  <div class="screen">
    <router-view />
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link :to="{ name: 'Transits Map' }">Transits Map</router-link>|
      <router-link :to="{ name: 'One Tap Sign Up' }">One Tap</router-link>
    </nav> -->
  </div>
</template>

<style>
@import url("/public/fonts/stylesheet.css");
@import url("/public/normalize.css");

a {
  color: black;
  text-decoration: none;
}

.screen {
  width: 100vw;
  height: 100vh;
}

h1,
h2,
h3,
h4,
p {
  margin: 0;
}

h1 {
  font-size: 5rem;
}

button {
  border: 0;
  background: 0;
}

/* body {
  margin: 0;
} */

* {
  box-sizing: border-box;
  /* overflow: hidden; */
}

html {
  font-size: 62.5%;
}

#app {
  font-family: "Uber Move", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
}

/* nav {
  padding: 30px;
} */
/* 
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
