<template>
  <div class="m-b-16">
    <div v-if="editMode">
      <div class="m-b-4">
        <b-input v-model="title" />
      </div>
      <div class="level is-mobile">
        <div class="level-left">
          <b-button
            @click="handleSave"
            :disabled="!isChanged"
            type="is-primary"
            icon-left="fas fa-save"
          >Save</b-button>
          <b-button
            @click="handleCancel"
            icon-left="fas fa-window-close"
            style="margin-left:1rem"
          >Cancel</b-button>
        </div>
        <div class="level-right">
          <b-button @click="handleDelete" type="is-danger" icon-left="fas fa-trash">Delete</b-button>
        </div>
      </div>
    </div>
    <h1 v-else class="h1">
      {{ title }}
      <span v-if="isOwner">
        <b-button @click="handleEdit" icon-left="fas fa-edit">Edit</b-button>
      </span>
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { BaseDocument } from "../scripts/datatypes";

@Component
export default class EditableTitle extends Vue {
  title = "abc";
  editMode = false;
  @Prop() document!: BaseDocument;
  @Prop() refDocument!: firebase.firestore.DocumentReference;
  mounted() {
    this.title = this.document.title;
  }
  get isOwner() {
    return (
      this.$store.state.user &&
      this.document.owner === this.$store.state.user.uid
    );
  }
  get isChanged() {
    return this.title !== this.document.title;
  }
  handleEdit() {
    this.editMode = true;
  }
  handleSave() {
    this.refDocument.update({
      title: this.title
    });
    this.document.title = this.title;
    this.editMode = false;
  }
  handleCancel() {
    this.title = this.document.title;
    this.editMode = false;
  }
  async handleDelete() {
    console.log("handleDelete");
    await this.refDocument.delete();
    this.$emit("deleted");
  }
}
</script>
