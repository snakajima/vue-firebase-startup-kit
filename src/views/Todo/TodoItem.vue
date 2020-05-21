<template>
  <b-modal :active.sync="isVisible" :width="488">
    <div class="popup">
      <b-input v-model="title" />
      <b-button @click="handleSave">Save</b-button>
      <b-button @click="handleDelete">Delete</b-button>
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
    this.isVisible = true;
    this.title = newValue.title;
  }

  handleSave() {
    this.item.ref.update({
      title: this.title
    });
    this.isVisible = false;
  }
  handleDelete() {
    this.item.ref.delete();
    this.isVisible = false;
  }
}
</script>

