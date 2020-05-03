<template>
  <section class="section">
    <div id="firebaseui-auth-container" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { authObject, ui } from "@/scripts/firebase";

export default Vue.extend({
  mounted() {
    ui.start("#firebaseui-auth-container", {
      signInOptions: [authObject.EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/"
    });
  }
});
</script>