<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        <span v-if="chatroom">#{{ chatroom.title }}</span>
      </h1>
      <div>
        <div v-for="message in messages" :key="message.id" class="chatFrame">
          <div class="chatName">{{message.ownerName}}</div>
          <div class="chatMessage">{{message.message}}</div>
        </div>
      </div>
      <div v-if="hasUser">
        <b-input v-model="message" maxlength="200" type="textarea"></b-input>
        <b-button type="is-primary" @click="handlePost">Post</b-button>
      </div>
      <div v-else class="notification">
        Please
        <router-link :to="`/auth?from=${pathHere}`">sign in</router-link>&nbsp;to participate in this channel.
      </div>
    </div>
    <div class="source-link">
      <a
        target="_blank"
        href="https://github.com/snakajima/vue-firebase-startup-kit/blob/playground/src/views/Chatroom.vue"
      >View source code of this page</a>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { db, firestore } from "@/scripts/firebase";

@Component
export default class Chatroom extends Vue {
  message = "";
  messages: Array<firebase.firestore.DocumentData> = [];
  detacher: firebase.Unsubscribe | undefined = undefined;
  refChatroom: firebase.firestore.DocumentReference | undefined = undefined;
  chatroom: firebase.firestore.DocumentData | undefined | null = null;

  async mounted() {
    this.refChatroom = db.doc(`chatrooms/${this.$route.params.roomId}`);
    this.chatroom = (await this.refChatroom.get()).data();
    this.detacher = this.refChatroom
      .collection("messages")
      .orderBy("timeCreated")
      .onSnapshot(snapshot => {
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

  get hasUser(): boolean {
    return !!this.$store.state.user;
  }
  get pathHere(): string {
    return encodeURIComponent(window.location.pathname);
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

<style lang="scss">
.chatFrame {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.chatName {
  font-weight: bold;
}
.chatMessage {
  padding-left: 1em;
}
.source-link {
  margin-top: 0.5rem;
  text-align: right;
}
</style>