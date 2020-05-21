<template>
  <section class="section">
    <div class="container" v-if="todolist">
      <editable-title :document="todolist" :refDocument="refTodoList" @deleted="handleListDelete" />
      <create-new :refCollection="refCollection" />
      <div v-for="item in todoitems" :key="item.id">
        <i :class="iconClass(item)" @click="handleCheck(item)" />
        {{ item.title }}
        <i @click="handleDetails(item)" class="m-l-8 fas fa-angle-right" />
      </div>
      <div class="m-t-8">
        <b-button :disabled="!enableArchive" @click="handleArchive" icon-left="archive">Archive</b-button>
      </div>
      <todo-item-view :item="details" />
      <source-link path="views/TodoList.vue" />
    </div>
    <b-loading v-else active />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { db, firestore } from "@/scripts/firebase";
import { TodoList, TodoItem } from "@/scripts/datatypes";
import EditableTitle from "@/components/EditableTitle.vue";
import SourceLink from "@/components/SourceLink.vue";
import CreateNew from "@/components/CreateNew.vue";
import TodoItemView from "@/views/Todo/TodoItem.vue";

@Component({
  components: {
    SourceLink,
    EditableTitle,
    CreateNew,
    TodoItemView
  }
})
export default class Chatroom extends Vue {
  todolist: TodoList | null = null;
  todoitems: Array<TodoItem> = [];
  details: TodoItem | any = {};
  detacher?: firebase.Unsubscribe;

  async created() {
    this.detacher = this.refCollection
      .orderBy("timeCreated")
      .onSnapshot(snapshot => {
        this.todoitems = snapshot.docs.map(doc => {
          return Object.assign(doc.data(), {
            id: doc.id,
            ref: doc.ref
          }) as TodoItem;
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
  get refCollection(): firebase.firestore.CollectionReference {
    return this.refTodoList.collection("todoitems");
  }
  get enableArchive(): boolean {
    return this.todoitems.reduce((result: boolean, item: TodoItem) => {
      return result || item.completed;
    }, false);
  }

  iconClass(item: TodoItem) {
    return item.completed ? "far fa-check-square" : "far fa-square";
  }
  async handleArchive() {
    const refArchive = await this.refTodoList.parent.add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      title: `${this.todolist!.title} ${new Date().toDateString()}`
    });
    const snapshot = await this.refCollection
      .where("completed", "==", true)
      .get();
    snapshot.forEach(doc => {
      db.runTransaction(async tx => {
        tx.set(db.doc(`${refArchive.path}/todoitems/${doc.id}`), doc.data());
        tx.delete(doc.ref);
      });
    });
  }
  handleCheck(item: TodoItem) {
    item.ref.update({
      completed: !item.completed
    });
  }
  handleDetails(item: TodoItem) {
    this.details = { ...item } as TodoItem;
  }
  handleListDelete() {
    this.$router.push("/todo");
  }
}
</script>