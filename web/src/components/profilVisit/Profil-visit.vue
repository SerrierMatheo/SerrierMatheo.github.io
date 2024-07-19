<template>
  <div>
    <div class="content">
      <info-perso-visit :prenom="user.firstname" :nom="user.name" :telephone="user.phone" />
      <profil-orga-visit v-if="user.type !== 'participant'" :titre="user.title" />
    </div>
  </div>
</template>

<script>
import infoPersoVisit from '@/components/profilVisit/info-perso-visit.vue'
import profilOrgaVisit from '@/components/profilVisit/profil-orga-visit.vue'

export default {
  components: {
    infoPersoVisit,
    profilOrgaVisit,
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
