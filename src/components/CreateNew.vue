<template>
  <form class="m-b-8" @submit.prevent="handleCreate">
    <h2 class="h2">Create New</h2>
    <b-input v-model="title" class="m-b-4"></b-input>
    <b-button type="submit" @click="handleCreate" icon-left="plus" />
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { db, firestore } from "@/scripts/firebase";

@Component
export default class CreateNew extends Vue {
  title = "";
  @Prop() readonly refCollection!: firebase.firestore.CollectionReference;

  async handleCreate() {
    const doc = await this.refCollection.add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      title: this.title
    });
    this.title = "";
    this.$emit("created", doc.id);
  }
}
</script>
