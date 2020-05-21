<template>
  <section class="section">
    <div class="container" v-if="todolist">
      <editable-title :document="todolist" :refDocument="refTodoList" @deleted="handleListDelete" />
      <form v-if="hasUser" class="m-b-8" @submit.prevent="handleAdd">
        <b-input v-model="title" class="m-b-4" />
        <b-button type="submit" :disabled="!enableNew" @click="handleAdd" icon-left="plus" />
      </form>
      <div v-for="item in todoitems" :key="item.id">
        <i
          :class="{far:true, 'fa-square':!item.completed, 'fa-check-square':item.completed}"
          @click="handleCheck(item)"
        />
        {{ item.title }}
        <i @click="handleDetails(item)" class="m-l-8 fas fa-angle-right" />
      </div>
      <div class="m-t-8">
        <b-button @click="handleArchive" icon-left="archive">Archive</b-button>
      </div>
      <todo-item-view :item="details" />
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
import EditableTitle from "@/components/EditableTitle.vue";
import SourceLink from "@/components/SourceLink.vue";
import TodoItemView from "@/views/Todo/TodoItem.vue";

@Component({
  components: {
    SourceLink,
    EditableTitle,
    TodoItemView
  }
})
export default class Chatroom extends Vue {
  title = "";
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
  get hasUser(): boolean {
    return !!this.$store.state.user;
  }
  get enableNew(): boolean {
    return this.title.length > 0;
  }

  async handleArchive() {
    const today = new Date();
    const refTodoListsCollection = db.collection(`todolists`);
    const docArchive = await refTodoListsCollection.add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      title: `${this.todolist!.title} ${today.toDateString()}`
    });
    const refArchiveCollection = db.collection(`${docArchive.path}/todoitems`);

    const snapshot = await this.refCollection
      .where("completed", "==", true)
      .get();
    snapshot.forEach(doc => {
      const data = doc.data();
      db.runTransaction(async tx => {
        tx.set(refArchiveCollection.doc(doc.id), data);
        tx.delete(this.refCollection.doc(doc.id));
      });
    });
  }
  async handleAdd() {
    if (this.enableNew) {
      await this.refTodoList.collection("todoitems").add({
        owner: this.$store.state.user.uid,
        ownerName: this.$store.state.user.displayName,
        timeCreated: firestore.FieldValue.serverTimestamp(),
        title: this.title,
        completed: false
      });
      this.title = "";
    }
  }
  async handleCheck(item: TodoItem) {
    if (this.isOwner(item)) {
      await item.ref.update({
        completed: !item.completed
      });
    }
  }
  async handleDetails(item: TodoItem) {
    this.details = { ...item } as TodoItem;
  }
  isOwner(item: TodoItem): boolean {
    const user = this.$store.state.user;
    return user && user.uid == item.owner;
  }
  handleListDelete() {
    this.$router.push("/todo");
  }
}
</script>

<style lang="scss">
</style>