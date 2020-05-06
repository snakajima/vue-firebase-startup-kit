<template>
  <section class="section">
    <div class="container" v-if="article">
      <h1 class="title">{{ article.title }}</h1>
      <rich-text-editor @onUpdate="handleUpdate" :content="article.content" />
      <b-button @click="handleSave">Save</b-button>
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
  detacher?: firebase.Unsubscribe;
  editor?: any;

  async created() {
    this.article = (await this.refArticle.get()).data() as BlogArticle;
  }
  destroyed() {
    this.detacher && this.detacher();
  }
  handleUpdate(editor: object) {
    console.log(editor);
    this.editor = editor;
  }
  async handleSave() {
    const content = this.editor.getJSON();
    console.log("handleSave", this.editor.getJSON());
    await this.refArticle.set({ content }, { merge: true });
  }

  get refArticle(): firebase.firestore.DocumentReference {
    return db.doc(`articles/${this.$route.params.articleId}`);
  }
}
</script>
