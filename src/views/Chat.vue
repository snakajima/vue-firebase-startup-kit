<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Chat</h1>
      <b-field label="New Chat Channel">
        <b-input v-model="title"></b-input>
      </b-field>
      <b-button @click="handleCreate">Create</b-button>
    </div>
    <hr />
    <h2>Your Channels</h2>
    <ul>
      <li v-for="room in chatrooms" :key="room.id">
        <router-link :to="`/chat/${room.id}`">{{room.title}}</router-link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { db, firestore } from "@/scripts/firebase";
import { Unsubscribe } from "firebase";
import { ChatRoom } from "@/scripts/datatypes";

@Component
export default class Chat extends Vue {
  title = "";
  detacher: Unsubscribe | undefined = undefined;
  refChatrooms = db.collection(`chatrooms`);
  chatrooms: Array<ChatRoom> = [];
  created() {
    this.detacher = this.refChatrooms
      .orderBy("timeCreated", "desc")
      .onSnapshot(snapshot => {
        this.chatrooms = snapshot.docs.map(doc => {
          const data = doc.data();
          data.id = doc.id;
          return data as ChatRoom;
        });
      });
  }
  destroyed() {
    if (this.detacher) {
      this.detacher();
    }
  }
  async handleCreate() {
    const doc = await this.refChatrooms.add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      title: this.title
    });
    console.log("doc", doc);
  }
}
</script>