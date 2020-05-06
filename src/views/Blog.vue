<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Blog</h1>
      <b-field label="New Blog Article">
        <b-input v-model="title"></b-input>
      </b-field>
      <b-button @click="handleCreate">Create</b-button>
    </div>
    <hr />
    <h2>Your Blog Articles</h2>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <router-link :to="`/blog/${article.id}`">{{article.title}}</router-link>
      </li>
    </ul>
    <source-link path="views/Blog.vue" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { db, firestore } from "@/scripts/firebase";
import { Unsubscribe } from "firebase";
import { BlogArticle } from "@/scripts/datatypes";
import SourceLink from "@/components/SourceLink.vue";

@Component({
  components: {
    SourceLink
  }
})
export default class Blog extends Vue {
  title = "";
  detacher?: Unsubscribe;
  refArticles = db.collection(`articles`);
  articles: Array<BlogArticle> = [];

  created() {
    this.detacher = this.refArticles
      .orderBy("timeCreated", "desc")
      .onSnapshot(snapshot => {
        this.articles = snapshot.docs.map(doc => {
          return Object.assign(doc.data(), { id: doc.id }) as BlogArticle;
        });
      });
  }
  destroyed() {
    this.detacher && this.detacher();
  }

  async handleCreate() {
    const doc = await this.refArticles.add({
      owner: this.$store.state.user.uid,
      ownerName: this.$store.state.user.displayName,
      timeCreated: firestore.FieldValue.serverTimestamp(),
      title: this.title
    });
    console.log("doc", doc);
    this.$router.push(`/blog/${doc.id}?edit=1`);
  }
}
</script>