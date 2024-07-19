<template>

  <v-footer class="footer" height="100" color="surface-variant">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="(link, index) in links"
        :key="link"
        :to="routes[index]"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>ENSTIB</strong>
      </v-col>
    </v-row>
  </v-footer>

</template>

<script>
export default {
  data: () => ({
    links: ['Accueil', 'forums', 'profil'],
    routes: ['/', '/forum', '/profil'],
  }),
};
</script>

<style scoped>

.footer {
  position: relative;
  width: 100%; /* Le footer occupe toute la largeur de la page */
  height: 100px;
  margin-top: 5vh;
}
</style>
