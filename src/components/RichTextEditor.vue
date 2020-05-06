<template>
  <div>
    <div>
      <editor-menu-bar v-if="!readonly" :editor="editor" v-slot="{ commands, isActive }">
        <div>
          <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">Bold</button>
        </div>
      </editor-menu-bar>
      <div :class="readonly ? 'readonly-frame' : 'editor-frame'">
        <editor-content class="editor-box" :editor="editor" />
      </div>
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
    content: {
      type: Object
    },
    readonly: {
      type: Boolean
    }
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
      content: this.content,
      onUpdate: this.handleUpdate,
      editable: !this.readonly
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
  watch: {
    readonly(newValue) {
      this.editor.setOptions({ editable: !newValue });
    }
  },
  methods: {
    handleUpdate() {
      this.$emit("onUpdate", this.editor);
    }
  }
};
</script>

<style>
.ProseMirror:focus {
  outline: none;
}
.editor-frame {
  height: 20rem;
  overflow: scroll;
  resize: vertical;
  padding: 0.5rem;
  outline: 1px solid grey;
  margin-bottom: 0.5rem;
}
.readonly-frame {
  padding: 0.5rem;
}

.editor-box p {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>