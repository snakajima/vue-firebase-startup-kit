<template>
  <div id="app">
    <header-component />
    <router-view v-if="authorized" />
  </div>
</template>

<script lang="ts">
import HeaderComponent from "@/components/Header.vue";
import { auth } from "@/scripts/firebase";
import { Unsubscribe } from "firebase";

export default {
  data() {
    return {
      detacher: undefined as Unsubscribe | undefined
    };
  },
  components: {
    HeaderComponent
  },
  created() {
    this.detacher = auth.onAuthStateChanged(user => {
      console.log("auth uid=", user && user.uid);
      this.$store.commit("setUser", user);
    });
  },
  computed: {
    authorized(): boolean {
      return this.$store.state.user !== undefined;
    }
  },
  destroyed() {
    if (this.detacher) {
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
