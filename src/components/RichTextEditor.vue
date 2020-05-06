<template>
  <div>
    <div>
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">Bold</button>
      </editor-menu-bar>
      <editor-content class="editor-box" :editor="editor" />
    </div>
  </div>
</template>

<script>
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

<style>
.ProseMirror:focus {
  outline: 1px #dddddd solid;
}
</style>