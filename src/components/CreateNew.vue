<template>
  <div>
    <b-field label="New Something">
      <b-input v-model="title"></b-input>
    </b-field>
    <b-button @click="handleCreate">Create</b-button>
  </div>
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
    console.log("doc", doc);
    this.$router.push(`/blog/${doc.id}?edit=1`);
  }
}
</script>
