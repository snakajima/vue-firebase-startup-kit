<template>
  <b-navbar type="is-primary">
    <template slot="start">
      <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
      <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>