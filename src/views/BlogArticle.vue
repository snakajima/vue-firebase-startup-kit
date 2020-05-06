<template>
  <section class="section">
    <div class="container" v-if="article">
      <h1 class="title">{{ article.title }}</h1>
      <rich-text-editor id="1" @onFocus="handleFocus" :focus="focus" />
      <rich-text-editor id="2" @onFocus="handleFocus" :focus="focus" />
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
import RichTextEditor from "@/components/RichTextEditor.vue";

@Component({
  components: {
    SourceLink,
    RichTextEditor
  }
})
export default class Blog extends Vue {
  article: BlogArticle | null = null;
  focus = "invalid";
  detacher?: firebase.Unsubscribe;

  async created() {
    this.article = (await this.refArticle.get()).data() as BlogArticle;
  }
  destroyed() {
    this.detacher && this.detacher();
  }
  handleFocus(id: string) {
    console.log("handleFocus", id);
    this.focus = id;
  }

  get refArticle(): firebase.firestore.DocumentReference {
    return db.doc(`articles/${this.$route.params.articleId}`);
  }
}
</script>
