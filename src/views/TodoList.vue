<template>
  <section class="section">
    <div class="container" v-if="todolist">
      <editable-title :document="todolist" :refDocument="refTodoList" @deleted="handleListDelete" />
      <div v-if="hasUser" class="m-b-8">
        <b-input v-model="newItem" class="m-b-4"></b-input>
        <b-button type="is-primary" @click="handlePost">Post</b-button>
      </div>
      <div v-for="item in todoitems" :key="item.id">
        <i
          :class="{far:true, 'fa-square':!item.completed, 'fa-check-square':item.completed}"
          @click="handleCheck(item.id)"
        />
        {{ item.title }}
        <i
          v-if="isOwner(item.id)"
          class="fas fa-trash"
          @click="handleDelete(item.id)"
        />
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
import { TodoList, TodoItem } from "@/scripts/datatypes";
import EditableTitle from "@/components/EditableTitle.vue";
import SourceLink from "@/components/SourceLink.vue";

@Component({
  components: {
    SourceLink,
    EditableTitle
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
  get itemMap(): any {
    return this.todoitems.reduce((ret: any, item) => {
      ret[item.id] = item;
      return ret;
    }, {});
  }

  async handlePost() {
    await this.refTodoList.collection("todoitems").add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      title: this.newItem,
      completed: false
    });
    this.newItem = "";
  }
  refTodoItem(id: string): firebase.firestore.DocumentReference {
    return this.refTodoList.collection("todoitems").doc(id);
  }
  async handleCheck(id: string) {
    const item = this.itemMap[id] as TodoItem;
    if (this.isOwner(id)) {
      await this.refTodoItem(id).update({
        completed: !item.completed
      });
    }
  }
  async handleDelete(id: string) {
    await this.refTodoItem(id).delete();
  }
  isOwner(id: string): boolean {
    const user = this.$store.state.user;
    const item = this.itemMap[id] as TodoItem;
    return user && user.uid == item.owner;
  }
  handleListDelete() {
    this.$router.push("/todo");
  }
}
</script>

<style lang="scss">
</style>