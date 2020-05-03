<template>
  <b-navbar type="is-primary">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/">Firebase Startup Kit</b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
      <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
      <b-navbar-item tag="router-link" to="/auth">Auth</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>