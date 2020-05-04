<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Chatroom
        <span v-if="chatroom">: {{ chatroom.title }}</span>
      </h1>
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
  detacher: Unsubscribe | undefined = undefined;
  refChatroom: firebase.firestore.DocumentReference | undefined = undefined;
  chatroom: any = null;
  async mounted() {
    console.log("mounted", this.$route.params.roomId);
    this.refChatroom = db.doc(`chatrooms/${this.$route.params.roomId}`);
    this.chatroom = (await this.refChatroom.get()).data();
    this.detacher = this.refChatroom
      .collection("messages")
      .onSnapshot(snapshot => {
        console.log(snapshot);
      });
  }
  destroyed() {
    if (this.detacher) {
      this.detacher();
    }
  }
}
</script>