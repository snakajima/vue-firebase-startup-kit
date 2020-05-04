<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Hello
        {{userName}}
      </h1>
      <p>Firebase rocks!</p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  get userName(): string {
    if (this.$store.state.user) {
      return this.$store.state.user.displayName;
    }
    return "";
  }
}
</script>