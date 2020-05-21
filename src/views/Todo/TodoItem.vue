<template>
  <b-modal :active.sync="isVisible" :width="488">
    <div class="popup">
      <b-input v-model="title" />
      <b-button @click="handleSave">Save</b-button>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { isPrimitive } from "vue-class-component/lib/util";
import { db, firestore } from "@/scripts/firebase";

@Component
export default class TodoItemView extends Vue {
  isVisible = false;
  title = "";

  @Prop() private item: any;
  @Watch("item")
  onItemChange(newValue: any) {
    console.log("item", newValue.title);
    this.isVisible = true;
    this.title = newValue.title;
  }

  handleSave() {
    console.log("handleSave", this.item);
    this.item.ref.update({
      title: this.title
    });
    this.isVisible = false;
  }
}
</script>

