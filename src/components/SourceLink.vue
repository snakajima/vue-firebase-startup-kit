<template>
  <div class="source-link">
    <a
      target="_blank"
      :href="`https://github.com/snakajima/vue-firebase-startup-kit/blob/playground/src/${path}`"
    >View source code of this page</a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class SourceLink extends Vue {
  @Prop() readonly path!: string;
}
</script>

<style lang="sass">
.source-link
	margin-top: 0.5rem
	text-align: right
</style>