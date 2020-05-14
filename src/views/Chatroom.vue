<template>
  <section class="section">
    <div class="container" v-if="chatroom">
      <editable-title :document="chatroom" :refDocument="refChatroom" @deleted="handleRoomDelete" />
      <div v-for="message in messages" :key="message.id" class="chatFrame">
        <div>
          <span class="chatName">{{message.ownerName}}</span>
          <span
            v-if="message.timeCreated"
            class="chatTime"
          >{{ message.timeCreated.toDate().toLocaleString()}}</span>
        </div>
        <div class="chatMessage">{{message.message}}</div>
      </div>
      <div v-if="hasUser">
        <b-input v-model="newMessage" type="textarea" class="m-b-4"></b-input>
        <b-button type="is-primary" @click="handlePost">Post</b-button>
      </div>
      <div v-else class="notification">
        Please
        <router-link :to="`/auth?from=${pathHere}`">sign in</router-link>&nbsp;to participate in this channel.
      </div>
      <source-link path="views/Chatroom.vue" />
    </div>
    <div v-else>
      <b-loading active />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { db, firestore } from "@/scripts/firebase";
import { ChatRoom, Message } from "@/scripts/datatypes";
import EditableTitle from "@/components/EditableTitle.vue";
import SourceLink from "@/components/SourceLink.vue";

@Component({
  components: {
    SourceLink,
    EditableTitle
  }
})
export default class Chatroom extends Vue {
  newMessage = "";
  messages: Array<Message> = [];
  chatroom: ChatRoom | null = null;
  detacher?: firebase.Unsubscribe;

  async created() {
    this.detacher = this.refChatroom
      .collection("messages")
      .orderBy("timeCreated")
      .onSnapshot(snapshot => {
        this.messages = snapshot.docs.map(doc => {
          return Object.assign(doc.data(), { id: doc.id }) as Message;
        });
      });
    this.chatroom = (await this.refChatroom.get()).data() as ChatRoom;
  }
  destroyed() {
    this.detacher && this.detacher();
  }

  get refChatroom(): firebase.firestore.DocumentReference {
    return db.doc(`chatrooms/${this.$route.params.roomId}`);
  }
  get hasUser(): boolean {
    return !!this.$store.state.user;
  }
  get pathHere(): string {
    return encodeURIComponent(window.location.pathname);
  }

  async handlePost() {
    await this.refChatroom.collection("messages").add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      message: this.newMessage
    });
    this.newMessage = "";
  }
  handleRoomDelete() {
    this.$router.push("/chat");
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
.chatTime {
  margin-left: 0.5em;
  font-size: 0.8em;
  color: #808080;
}
.chatMessage {
  padding-left: 1em;
}
</style>