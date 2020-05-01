<template>
  <div class="home">
    <img v-if="false" alt="Vue logo" src="../assets/logo.png" />
    <b-button>Bar2</b-button>
    <HelloWorld v-if="false" msg="Welcome to My Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
