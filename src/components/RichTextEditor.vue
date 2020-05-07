<template>
  <div>
    <div>
      <editor-menu-bar v-if="!readonly" :editor="editor" v-slot="{ commands, isActive }">
        <div style="margin-bottom:1px">
          <b-button size="is-small" @click="commands.undo" type="is-light" icon-left="fas fa-undo" />
          <b-button size="is-small" @click="commands.redo" type="is-light" icon-left="fas fa-redo" />
          <b-button
            size="is-small"
            @click="commands.bold"
            :type="isActive.bold() ? 'is-dark':'is-light'"
            icon-left="fas fa-bold"
          />
          <b-button
            size="is-small"
            @click="commands.italic"
            :type="isActive.italic() ? 'is-dark':'is-light'"
            icon-left="fas fa-italic"
          />
          <b-button
            size="is-small"
            @click="commands.underline"
            :type="isActive.underline() ? 'is-dark':'is-light'"
            icon-left="fas fa-underline"
          />
          <b-button
            size="is-small"
            @click="commands.bullet_list"
            :type="isActive.bullet_list() ? 'is-dark':'is-light'"
            icon-left="fas fa-list"
          />
          <b-button
            size="is-small"
            @click="commands.ordered_list"
            :type="isActive.ordered_list() ? 'is-dark':'is-light'"
            icon-left="fas fa-list-ol"
          />
          <b-button
            size="is-small"
            @click="commands.heading({level:1})"
            :type="isActive.heading({level:1}) ? 'is-dark':'is-light'"
          >H1</b-button>
          <b-button
            size="is-small"
            @click="commands.heading({level:2})"
            :type="isActive.heading({level:2}) ? 'is-dark':'is-light'"
          >H2</b-button>
          <b-button
            size="is-small"
            @click="commands.heading({level:3})"
            :type="isActive.heading({level:3}) ? 'is-dark':'is-light'"
          >H3</b-button>
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
    const options = {
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
      onUpdate: this.handleUpdate,
      editable: !this.readonly,
      autoFocus: !this.readonly
    };
    if (this.content) {
      options.content = this.content;
    }
    this.editor = new Editor(options);
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
      this.editor.setOptions({ editable: !newValue, autoFocus: !newValue });
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
h1 {
  margin-bottom: 0.8rem;
}
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
}

.editor-box p {
}
.editor-box li {
  margin-left: 1rem;
}
.editor-box ul {
  list-style-type: disc;
}
.editor-box h1 {
  font-weight: bold;
  font-size: 1.6em;
  margin-bottom: 0.6rem;
}
.editor-box h2 {
  font-weight: bold;
  font-size: 1.4em;
  margin-bottom: 0.4rem;
}
.editor-box h3 {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 0.2rem;
}
</style>