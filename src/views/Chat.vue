<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Chat</h1>
      <b-button @click="handleCreate">Create a Chat Room</b-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { db, firestore } from "@/scripts/firebase";

@Component
export default class Chat extends Vue {
  async handleCreate() {
    console.log("handleCreate");
    const doc = await db.collection(`chatrooms`).add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      title: "(untitled)"
    });
    console.log("doc", doc);
  }
}
</script>