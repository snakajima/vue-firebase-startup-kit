<template>
  <div id="app">
    <header-component />
    <router-view />
  </div>
</template>

<script lang="ts">
import HeaderComponent from "@/components/Header.vue";

export default {
  components: {
    HeaderComponent
  }
};
</script>

<style lang="scss">
@import "@/assets/buefy.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
