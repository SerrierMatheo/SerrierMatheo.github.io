<template>
    <div class="container">
      <v-row class="card-row">
        <v-col
          v-for="(stand, index) in filteredStands"
          :key="stand.id_company"
          class="card-col"
        >
          <company-card
            :logo="logos[stand.id_company]"
            :name="stand.name"
          />
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  import CompanyCard from '@/components/accueil/company-card.vue'
  
  export default {
    components: {
      CompanyCard,
    },
    data() {
      return {
        standsDatas: [],
        selectedTag: null,
        logos: {}, // Stock les logos des stands
      };
    },
    computed: {
      filteredStands() {
        if (!this.selectedTag) {
          return this.standsDatas;
        }
        return this.standsDatas.filter(stand => stand.tagname === this.selectedTag);
      },
    },
    methods: {
      async fetchStandsDatas() {
        try {
          const response = await this.$apiForum.get("api/company");
          this.standsDatas = response.data;
          // Récupérer les logos pour chaque stand
          for (let stand of this.standsDatas) {
            await this.fetchStandLogo(stand.id_company);
          }
        } catch (error) {
          console.log("Erreur lors de la récupération des stands", error);
        }
      },
      async fetchStandLogo(companyId) {
        try {
          const response = await this.$apiForum.get(`/api/company/${companyId}/logo`, {
            responseType: 'blob' // Pour s'assurer que l'image est récupérée sous forme de blob
          });
          this.logos = { ...this.logos, [companyId]: URL.createObjectURL(response.data) };
        } catch (error) {
          console.log("Erreur lors de la récupération du logo du stand", error);
        }
      }
    },
    async mounted() {
      await this.fetchStandsDatas();
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin: 0 5vw;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  
  .card-row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust the minimum width for cards */
    gap: 16px; /* Adjust this value to increase/decrease space between cards */
    row-gap: 32px;
    margin: 0;
  }
  
  .card-col {
    display: flex;
    justify-content: center; /* Center the card content horizontally */
  }
  
  /* Media queries to adjust the number of columns */
  @media (max-width: 1200px) {
    .card-row {
      grid-template-columns: repeat(3, 1fr); /* 3 columns for smaller screens */
    }
  }
  
  @media (max-width: 992px) {
    .card-row {
      grid-template-columns: repeat(2, 1fr); /* 2 columns for smaller screens */
    }
  }
  
  @media (max-width: 768px) {
    .card-row {
      grid-template-columns: repeat(1, 1fr); /* 1 column for smaller screens */
    }
  }
  
  </style>
  