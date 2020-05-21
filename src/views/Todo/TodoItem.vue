<template>
  <b-modal :active.sync="isVisible" :width="488">
    <form class="popup" @submit.prevent="handleSave">
      <b-input class="m-b-8" v-model="title" />
      <b-input class="m-b-8" v-model="description" type="textarea" placeholder="description" />
      <b-button
        class="button is-primary"
        type="submit"
        :disabled="!modified"
        @click="handleSave"
        icon-left="save"
      />
      <b-button class="m-l-8" type="is-danger" @click="handleDelete" icon-left="trash" />
    </form>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { TodoItem } from "@/scripts/datatypes";

@Component
export default class TodoItemView extends Vue {
  isVisible = false;
  title = "";
  description = "";

  @Prop() private item!: TodoItem;
  @Watch("item")
  onItemChange(newValue: TodoItem) {
    this.isVisible = true;
    this.title = newValue.title;
    this.description = newValue.description || "";
  }
  get modified(): boolean {
    return (
      this.title !== this.item.title ||
      this.description !== (this.item.description || "")
    );
  }

  handleSave() {
    if (this.modified) {
      this.item.ref.update({
        title: this.title,
        description: this.description
      });
      this.isVisible = false;
    }
  }
  handleDelete() {
    this.item.ref.delete();
    this.isVisible = false;
  }
}
</script>

