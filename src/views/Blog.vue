<template>
  <section class="section">
    <h1 class="title">Blog</h1>
    <create-new :refCollection="refArticles" @created="handleCreated" />
    <hr />
    <h2>Your Blog Articles</h2>
    <list-view :refCollection="refArticles" path="blog" />
    <source-link path="views/Blog.vue" />
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
  refArticles = db.collection(`articles`);

  handleCreated(id: string) {
    this.$router.push(`/blog/${id}?edit=1`);
  }
}
</script>