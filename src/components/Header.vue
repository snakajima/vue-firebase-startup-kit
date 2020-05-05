<template>
  <b-navbar type="is-primary" :is-active.sync="isActive">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/">Vur+Firebase Playground</b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
      <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item v-if="hasUser" tag="div">
        <b-button @click="handleSignOut">Sign Out</b-button>
      </b-navbar-item>
      <b-navbar-item v-else tag="router-link" to="/auth">Sign In</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { auth } from "@/scripts/firebase";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  isActive = false;
  get hasUser(): boolean {
    return !!this.$store.state.user;
  }
  handleSignOut() {
    auth.signOut();
    this.isActive = false;
  }
}
</script>