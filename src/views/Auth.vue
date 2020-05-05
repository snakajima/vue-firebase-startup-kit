<template>
  <section class="section">
    <div id="firebaseui-auth-container" />
  </section>
</template>

<script lang="ts">
import { authObject, ui } from "@/scripts/firebase";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Auth extends Vue {
  mounted() {
    ui.start("#firebaseui-auth-container", {
      signInOptions: [authObject.EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: this.from
    });
  }
  get from(): string {
    if (this.$route.query.from) {
      return this.$route.query.from as string;
    }
    return "/";
  }
}
</script>