<template>
  <section class="section">
    <h1 class="h1">Todo</h1>
    <create-new :refCollection="refCollection" @created="handleCreated" />
    <hr />
    <h2 class="h2">Your Todo Lists</h2>
    <list-view :refCollection="refCollection" path="todo" />
    <source-link path="views/Todo.vue" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { db } from "@/scripts/firebase";
import CreateNew from "@/components/CreateNew.vue";
import ListView from "@/components/ListView.vue";
import SourceLink from "@/components/SourceLink.vue";

@Component({
  components: {
    SourceLink,
    CreateNew,
    ListView
  }
})
export default class Blog extends Vue {
  refCollection = db.collection(`todolists`);

  handleCreated(id: string) {
    this.$router.push(`/todo/${id}`);
  }
}
</script>