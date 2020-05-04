<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Chatroom
        <span v-if="chatroom">: {{ chatroom.title }}</span>
      </h1>
      <div>
        <div
          v-for="message in messages"
          :key="message.id"
        >{{message.ownerName}}: {{message.message}}</div>
      </div>
      <b-field label="Message">
        <b-input v-model="message" maxlength="200" type="textarea"></b-input>
      </b-field>
      <b-button @click="handlePost">Post</b-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { db, firestore } from "@/scripts/firebase";
import { Unsubscribe } from "firebase";

@Component
export default class Chatroom extends Vue {
  message = "";
  messages: Array<any> = [];
  detacher: Unsubscribe | undefined = undefined;
  refChatroom: firebase.firestore.DocumentReference | undefined = undefined;
  chatroom: any = null;
  async mounted() {
    console.log("mounted", this.$route.params.roomId);
    this.refChatroom = db.doc(`chatrooms/${this.$route.params.roomId}`);
    this.chatroom = (await this.refChatroom.get()).data();
    this.detacher = this.refChatroom
      .collection("messages")
      .orderBy("timeCreated")
      .onSnapshot(snapshot => {
        console.log(snapshot);
        this.messages = snapshot.docs.map(doc => {
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
  async handlePost() {
    await this.refChatroom!.collection("messages").add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      message: this.message
    });
    this.message = "";
  }
}
</script>