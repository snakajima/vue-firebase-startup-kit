<template>
  <section class="section">
    <div class="container" v-if="todolist">
      <h1 class="title">{{ todolist.title }}</h1>
      <div v-if="hasUser">
        <b-input v-model="newItem" maxlength="200"></b-input>
        <b-button type="is-primary" @click="handlePost">Post</b-button>
      </div>
      <div v-for="item in todoitems" :key="item.id">{{ item.title }}</div>
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
import { TodoList, TodoItem } from "@/scripts/datatypes";
import SourceLink from "@/components/SourceLink.vue";

@Component({
  components: {
    SourceLink
  }
})
export default class Chatroom extends Vue {
  newItem = "";
  todolist: TodoList | null = null;
  todoitems: Array<TodoItem> = [];
  detacher?: firebase.Unsubscribe;

  async created() {
    this.detacher = this.refTodoList
      .collection("todoitems")
      .orderBy("timeCreated")
      .onSnapshot(snapshot => {
        this.todoitems = snapshot.docs.map(doc => {
          return Object.assign(doc.data(), { id: doc.id }) as TodoItem;
        });
      });
    this.todolist = (await this.refTodoList.get()).data() as TodoList;
  }
  destroyed() {
    this.detacher && this.detacher();
  }

  get refTodoList(): firebase.firestore.DocumentReference {
    return db.doc(`todolists/${this.$route.params.listId}`);
  }
  get hasUser(): boolean {
    return !!this.$store.state.user;
  }

  async handlePost() {
    await this.refTodoList.collection("todoitems").add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      title: this.newItem
    });
    this.newItem = "";
  }
}
</script>

<style lang="scss">
</style>