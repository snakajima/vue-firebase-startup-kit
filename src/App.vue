<template>
  <div id="app">
    <b-navbar type="is-primary">
      <template slot="start">
        <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
        <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/buefy.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
