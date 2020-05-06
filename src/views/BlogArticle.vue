<template>
  <section class="section">
    <div class="container" v-if="article">
      <h1 class="title">
        {{ article.title }}
        <b-button v-if="isOwner && !editMode" @click="handleEdit">Edit</b-button>
      </h1>
      <div v-if="isOwner && editMode">
        <rich-text-editor @onUpdate="handleUpdate" :content="article.content" />
        <div>
          <b-button @click="handleSave" :disabled="!editor" type="is-primary">Save</b-button>
          <b-button @click="handleCancel">Cancel</b-button>
          <b-button @click="handleDelete" type="is-danger">Delete</b-button>
        </div>
      </div>
      <div v-else>
        <rich-text-editor :content="article.content" :readonly="true" />
      </div>
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
  editMode = false;
  article: BlogArticle | null = null;
  detacher?: firebase.Unsubscribe;
  editor: any | null = null;

  async created() {
    this.article = (await this.refArticle.get()).data() as BlogArticle;
  }
  mounted() {
    if (this.$route.query.edit) {
      this.editMode = true;
    }
  }
  destroyed() {
    this.detacher && this.detacher();
  }
  handleUpdate(editor: object) {
    this.editor = editor;
  }
  async handleSave() {
    this.article!.content = this.editor.getJSON();
    await this.refArticle.set(
      { content: this.article!.content },
      { merge: true }
    );
    this.editMode = false;
  }
  handleCancel() {
    if (this.editor) {
      this.editor.setContent(this.article!.content || "");
    }
    this.editMode = false;
  }
  handleEdit() {
    this.editMode = true;
  }
  async handleDelete() {
    await this.refArticle.delete();
    this.$router.push("/blog");
  }

  get refArticle(): firebase.firestore.DocumentReference {
    return db.doc(`articles/${this.$route.params.articleId}`);
  }
  get isOwner() {
    return (
      this.$store.state.user &&
      this.article!.owner === this.$store.state.user.uid
    );
  }
}
</script>
