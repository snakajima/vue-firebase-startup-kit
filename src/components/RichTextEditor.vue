<template>
  <div>
    <div v-if="false">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">Bold</button>
      </editor-menu-bar>
      <editor-content :editor="editor" />
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = new Editor({
      content: "<p>This is just a boring paragraph</p><p>Foo</p>",
      onUpdate: this.handleUpdate
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    handleUpdate(foo) {
      console.log(foo.getJSON());
    }
  }
};
</script>