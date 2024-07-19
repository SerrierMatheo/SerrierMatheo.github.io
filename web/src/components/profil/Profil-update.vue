<template>
  <div>
    <div class="content">
      <info-perso :prenom="user.firstname" :nom="user.name" :telephone="user.phone" />
      <profil-orga v-if="user.type !== 'participant'" :titre="user.title" />
    </div>
  </div>
</template>

<script>
import infoPerso from "@/components/profil/info-perso.vue";
import profilOrga from "@/components/profil/profil-orga.vue";

export default {
  components: {
    infoPerso,
    profilOrga,
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  gap: 7.5vw;
}
</style>
