<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Hello
        {{userName}}
      </h1>
      <div v-if="hasUser">
        <p>Welcome to the play ground!</p>
        <ul>
          <li>
            <router-link to="/chat">Chat</router-link>
          </li>
          <li>
            <router-link to="/blog">Blog</router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Please Sign-in to see various features!</p>
      </div>
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
  get hasUser(): boolean {
    return !!this.$store.state.user;
  }
}
</script>