<template>
  <div>
    <div>
      <editor-menu-bar v-if="showMenu" :editor="editor" v-slot="{ commands, isActive }">
        <div style="position:absolute">
          <div style="position:relative; top:-2rem">
            <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">Bold</button>
          </div>
        </div>
      </editor-menu-bar>
      <editor-content class="editor-box" :editor="editor" />
    </div>
  </div>
</template>

<script>
// https://github.com/scrumpy/tiptap
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    id: { type: String, required: true },
    focus: { type: String }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History()
      ],
      content: "<p>This is just a boring paragraph</p><p>Foo</p>",
      onUpdate: this.handleUpdate,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  computed: {
    showMenu() {
      console.log(this.id, this.focus);
      return this.id === this.focus;
    }
  },
  methods: {
    handleUpdate(foo) {
      console.log(foo.getJSON());
    },
    handleFocus() {
      console.log("handleFocus");
      this.$emit("onFocus", this.id);
    }
  }
};
</script>

<style>
.ProseMirror:focus {
  outline: 1px #dddddd solid;
}
.editor-box p {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>