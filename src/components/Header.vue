<template>
  <b-navbar type="is-primary">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/">Firebase Startup Kit</b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
      <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
      <b-navbar-item v-if="hasUser" tag="div">
        <a href="#" @click="handleSignOut">Sign Out</a>
      </b-navbar-item>
      <b-navbar-item v-else tag="router-link" to="/auth">Sign In</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";
import { auth } from "@/scripts/firebase";

export default Vue.extend({
  computed: {
    hasUser() {
      return !!this.$store.state.user;
    }
  },
  methods: {
    handleSignOut() {
      console.log("sign out");
      auth.signOut();
    }
  }
});
</script>