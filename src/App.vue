<template>
  <div id="app">
    <header-component />
    <router-view />
  </div>
</template>

<script lang="ts">
import HeaderComponent from "@/components/Header.vue";
import { auth } from "@/scripts/firebase";
import { Unsubscribe } from "firebase";

export default {
  data() {
    return {
      detacher: null
    };
  },
  components: {
    HeaderComponent
  },
  created() {
    this.detacher = auth.onAuthStateChanged(user => {
      console.log("auth", user);
    });
  },
  destroyed() {
    if (this.detacher !== null) {
      this.detacher();
    }
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
