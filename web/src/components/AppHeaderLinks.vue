<script setup>
const items = [
  {
    title: 'Vuetify Documentation',
    icon: `mdi-youtube`,
    href: 'https://vuetifyjs.com/',
  },
  {
    title: 'Vuetify Support',
    icon: 'mdi-facebook',
    href: 'https://support.vuetifyjs.com/',
  },
  {
    title: 'Vuetify X',
    icon: `mdi-instagram`,
    href: 'https://x.com/vuetifyjs',
  },
  {
    title: 'Vuetify GitHub',
    icon: `mdi-linkedin`,
    href: 'https://github.com/vuetifyjs/vuetify',
  },
]
</script>

<template>
  <v-container class="bg-primary flex pa-0 custom-height" app>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link bg-primary"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        :icon="item.icon"
        :size=25
      />
    </a>
  </v-container>
</template>

<style scoped lang="sass">
.custom-height
  height: 37px
  max-width: 100%
  display: flex
  gap: 10px
  justify-content: center
  align-items: center

.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out
  background-color: white
  border-radius: 25px
  color: #2A2E46
  padding: 5px

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
