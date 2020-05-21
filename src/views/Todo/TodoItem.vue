<template>
  <b-modal :active.sync="isVisible" :width="488">
    <div class="popup">
      <b-input class="m-b-8" v-model="title" />
      <b-button type="is-primary" :disabled="!modified" @click="handleSave">Save</b-button>
      <b-button class="m-l-8" @click="handleCancel">Cancel</b-button>
      <b-button class="m-l-8" type="is-danger" @click="handleDelete">
        <i class="fas fa-trash" />
      </b-button>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { TodoItem } from "@/scripts/datatypes";

@Component
export default class TodoItemView extends Vue {
  isVisible = false;
  title = "";

  @Prop() private item!: TodoItem;
  @Watch("item")
  onItemChange(newValue: TodoItem) {
    this.isVisible = true;
    this.title = newValue.title;
  }
  get modified(): boolean {
    return this.title !== this.item.title;
  }

  handleSave() {
    this.item.ref.update({
      title: this.title
    });
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
  }
  handleDelete() {
    this.item.ref.delete();
    this.isVisible = false;
  }
}
</script>

