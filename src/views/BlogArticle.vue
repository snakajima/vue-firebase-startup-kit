<template>
  <section class="section">
    <div class="container" v-if="article">
      <div v-if="isOwner">
        <h1 v-if="!editMode" class="h1">
          {{ article.title }}
          <b-button @click="handleEdit" icon-left="fas fa-edit">Edit</b-button>
        </h1>
        <div v-else style="margin-bottom: 0.5rem">
          <b-input v-model="title" @input="handleChange" />
        </div>
      </div>
      <div v-else>
        <h1 class="h1">{{ article.title }}</h1>
      </div>
      <div v-if="isOwner && editMode">
        <rich-text-editor @onUpdate="handleUpdate" :content="article.content" />
        <div class="level is-mobile">
          <div class="level-left">
            <b-button
              @click="handleSave"
              :disabled="!isChanged"
              type="is-primary"
              icon-left="fas fa-save"
            >Save</b-button>
            <b-button
              @click="handleCancel"
              icon-left="fas fa-window-close"
              style="margin-left:1rem"
            >Cancel</b-button>
          </div>
          <div class="level-right">
            <b-button @click="handleDelete" type="is-danger" icon-left="fas fa-trash">Delete</b-button>
          </div>
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
  isChanged = false;
  title = "";
  article: BlogArticle | null = null;
  detacher?: firebase.Unsubscribe;
  editor: any | null = null;

  async created() {
    this.article = (await this.refArticle.get()).data() as BlogArticle;
    this.title = this.article.title;
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
    this.isChanged = true;
    this.editor = editor;
  }
  handleChange() {
    this.isChanged = true;
  }
  async handleSave() {
    if (this.editor) {
      this.article!.content = this.editor.getJSON();
    }
    this.article!.title = this.title;
    await this.refArticle.set(
      { content: this.article!.content, title: this.title },
      { merge: true }
    );
    this.editMode = false;
    this.isChanged = false;
  }
  handleCancel() {
    if (this.editor) {
      this.editor.setContent(this.article!.content || "");
    }
    this.title = this.article!.title;
    this.editMode = false;
    this.isChanged = false;
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
