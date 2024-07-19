<template>
  <div>
    <editor-menu-bar :editor="editor" />
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import TextAlign from '@tiptap/extension-text-align'
import EditorMenuBar from '@/components/EditorMenuBar.vue'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['update:content'])

const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      BulletList,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: props.content,
    onUpdate({ editor }) {
      emit('update:content', editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'editor-content',
        placeholder: props.placeholder,
      },
    },
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

watch(() => props.content, (newContent) => {
  if (editor.value && newContent !== editor.value.getHTML()) {
    editor.value.commands.setContent(newContent)
  }
})
</script>

<style>
.editor-content {
  min-height: 150px;
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
