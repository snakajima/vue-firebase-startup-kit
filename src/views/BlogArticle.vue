<template>
  <section class="section">
    <div class="container" v-if="article">
      <h1 class="title">{{ article.title }}</h1>
      <source-link path="views/BlogArticle.vue" />
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
import { BlogArticle } from "@/scripts/datatypes";
import SourceLink from "@/components/SourceLink.vue";

@Component({
  components: {
    SourceLink
  }
})
export default class Blog extends Vue {
  article: BlogArticle | null = null;
  detacher?: firebase.Unsubscribe;

  async created() {
    this.article = (await this.refArticle.get()).data() as BlogArticle;
  }
  destroyed() {
    this.detacher && this.detacher();
  }

  get refArticle(): firebase.firestore.DocumentReference {
    return db.doc(`articles/${this.$route.params.articleId}`);
  }
}
</script>
