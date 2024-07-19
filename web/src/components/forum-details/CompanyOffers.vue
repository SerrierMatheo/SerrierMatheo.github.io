<template>
  <div class="company-offers">
    <h2>Offres d'emploi</h2>
    <div v-if="offers.length === 0">Aucune offre disponible pour le moment.</div>
    <div class="offers-list" v-else>
      <CompanyOffer
        v-for="offer in offers"
        :key="offer.id_offer"
        :title="offer.title"
        :type="offer.type"
        :file="offer.file"
      >
        <template #type>
        <h3>{{ offer.type }}</h3>
        </template>
        <template #title>
          <p>{{ offer.title }}</p>
        </template>

      </CompanyOffer>
    </div>
  </div>
</template>

<script>
import CompanyOffer from '@/components/forum-details/CompanyOffer.vue';

export default {
  components: {
    CompanyOffer
  },
  props: {
    companyId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      offers: []
    };
  },
  methods: {
    async fetchOffers() {
      try {
        const response = await this.$apiForum.get(`/api/company/${this.$route.params.id}/offers`);
        this.offers = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des offres:", error);
      }
    }
  },
  async mounted() {
    await this.fetchOffers();
  }
};
</script>

<style scoped>
.company-offers {
  margin: 10px 40px 150px;
  padding: 2vh 2vw;
}

.company-offers h2 {
  margin-bottom: 35px;
  font-size: 2rem;
  font-weight: bold;
  color: #2A2E46;
  text-decoration: underline 3px #FF172B;
}

.offers-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}
</style>
