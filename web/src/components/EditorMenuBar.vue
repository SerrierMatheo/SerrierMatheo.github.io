<template>
  <div class="menu-bar">
    <button @click="toggleBold"><font-awesome-icon icon="bold" /></button>
    <button @click="toggleItalic"><font-awesome-icon icon="italic" /></button>
    <button @click="toggleUnderline"><font-awesome-icon icon="underline" /></button>
    <button @click="toggleBulletList"><font-awesome-icon icon="list-ul" /></button>
    <button @click="setTextAlign('left')"><font-awesome-icon icon="align-left" /></button>
    <button @click="setTextAlign('center')"><font-awesome-icon icon="align-center" /></button>
    <button @click="setTextAlign('right')"><font-awesome-icon icon="align-right" /></button>
    <button @click="setColor('red')"><font-awesome-icon :icon="['fas', 'tint']" style="color: red;" /></button>
    <button @click="setColor('green')"><font-awesome-icon :icon="['fas', 'tint']" style="color: green;" /></button>
    <button @click="setColor('blue')"><font-awesome-icon :icon="['fas', 'tint']" style="color: blue;" /></button>
  </div>
</template>

<script setup>
const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
})

const toggleBold = () => {
  props.editor.chain().focus().toggleBold().run()
}

const toggleItalic = () => {
  props.editor.chain().focus().toggleItalic().run()
}

const toggleUnderline = () => {
  props.editor.chain().focus().toggleUnderline().run()
}

const toggleBulletList = () => {
  props.editor.chain().focus().toggleBulletList().run()
}

const setTextAlign = (align) => {
  props.editor.chain().focus().setTextAlign(align).run()
}

const setColor = (color) => {
  props.editor.chain().focus().setColor(color).run()
}
</script>

<style>
.menu-bar {
  margin-bottom: 1rem;
}

.menu-bar button {
  margin-right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-bar button:hover {
  color: #007BFF;
}
</style>
