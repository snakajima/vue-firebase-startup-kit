<template>
  <b-modal :active.sync="isVisible" :width="488">
    <p>Hello {{item.id}}</p>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { isPrimitive } from "vue-class-component/lib/util";

@Component
export default class TodoItemView extends Vue {
  isVisible = true;

  @Prop() private item: any | null;
  @Watch("item")
  onItemChange(newValue: boolean) {
    console.log("item", newValue);
    this.isVisible = true;
  }
}
</script>

