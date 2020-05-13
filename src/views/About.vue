<template>
  <section class="section">
    <div class="container">
      <h1 class="title">About</h1>
      <p>Firebase rocks!</p>
    </div>
    <source-link path="views/About.vue" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import SourceLink from "@/components/SourceLink.vue";

@Component({
  components: {
    SourceLink,
  }
})
export default class About extends Vue {
}
</script>