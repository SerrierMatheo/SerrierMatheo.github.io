<script>
import IntervenantCard from './IntervenantCard.vue';

export default {
  components: {
    IntervenantCard
  },
  data() {
    return {
      intervenants: [],
    }
  },
  props: {
    companyId: {
      type: Number,
      required: true
    }
  },
  methods: {
    async fetchIntervenants() {
      try {
        const response = await this.$apiForum.get(`/api/company/${this.companyId}/intervenants`);
        this.intervenants = response.data;
      } catch (error) {
        console.log("Erreur lors de la récupération des intervenants", error);
      }
    }
  },
  async created() {
    await this.fetchIntervenants();
  }
};
</script>

<template>
  <div class="main">
    <h2 class="presentation-title">Intervenants</h2>
    <v-row justify="center" class="card-row">
      <v-col
        v-for="intervenant in intervenants"
        :key="intervenant.id_intervenant"
        class="d-flex justify-center"
      >
        <IntervenantCard :intervenant="intervenant" class="cardIntervenant" />
      </v-col>
    </v-row>
    <div v-if="intervenants.length === 0">
      <p>Aucun intervenant trouvé.</p>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin: 10px 40px;
  padding: 2vh 2vw;
}

.presentation-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2A2E46;
  text-decoration: underline 3px #FF172B;
}

.card-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px; /* Ajustez l'espacement entre les cartes */
}

</style>
