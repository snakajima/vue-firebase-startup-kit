<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Todo</h1>
      <b-field label="New Todo List">
        <b-input v-model="title"></b-input>
      </b-field>
      <b-button @click="handleCreate">Create</b-button>
    </div>
    <hr />
    <h2>Your Channels</h2>
    <ul>
      <li v-for="todolist in todolists" :key="todolist.id">
        <router-link :to="`/chat/${todolist.id}`">{{todolist.title}}</router-link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { db, firestore } from "@/scripts/firebase";
import { Unsubscribe } from "firebase";
import { TodoList } from "@/scripts/datatypes";

@Component
export default class ToDo extends Vue {
  title = "";
  detacher?: Unsubscribe;
  refTodoLists = db.collection(`todolists`);
  todolists: Array<TodoList> = [];

  created() {
    this.detacher = this.refTodoLists
      .orderBy("timeCreated", "desc")
      .onSnapshot(snapshot => {
        this.todolists = snapshot.docs.map(doc => {
          return Object.assign(doc.data(), { id: doc.id }) as TodoList;
        });
      });
  }
  destroyed() {
    this.detacher && this.detacher();
  }

  async handleCreate() {
    const doc = await this.refTodoLists.add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      title: this.title
    });
    console.log("doc", doc);
    this.$router.push(`/todo/${doc.id}`);
  }
}
</script>