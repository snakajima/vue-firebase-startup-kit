<template>
  <b-modal :active.sync="isVisible" :width="488">
    <p>Hello {{itemId}}</p>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TodoItemView extends Vue {
  isVisible = true;

  @Prop() private itemId!: string;
}
</script>

