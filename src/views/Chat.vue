<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Chat</h1>
      <b-button @click="handleCreate">Create a Chat Room</b-button>
    </div>
    <ul>
      <li v-for="room in chatrooms" :key="room.id">{{room.title}}</li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { db, firestore } from "@/scripts/firebase";
import { Unsubscribe } from "firebase";

@Component
export default class Chat extends Vue {
  detacher: Unsubscribe | undefined = undefined;
  refChatrooms = db.collection(`chatrooms`);
  chatrooms: Array<any> = [];
  created() {
    this.detacher = this.refChatrooms
      .orderBy("timeCreated", "desc")
      .onSnapshot(snapshot => {
        console.log(snapshot);
        this.chatrooms = snapshot.docs.map(doc => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
      });
  }
  destroyed() {
    if (this.detacher) {
      this.detacher();
    }
  }
  async handleCreate() {
    console.log("handleCreate");
    const doc = await this.refChatrooms.add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      title: "(untitled)"
    });
    console.log("doc", doc);
  }
}
</script>