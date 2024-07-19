<template>
  <div>
    <div class="container">
      <div class="field-container">
        <!-- Champ de saisie pour le mot-clé -->
        <v-text-field
          v-model="keyword"
          label="Search by keyword"
          @input="fetchStandsDatas"
          class="keyword-input"
        ></v-text-field>

        <!-- Champ de sélection multiple pour les secteurs d'actiité -->
        <v-select
          v-model="selectedSectors"
          :items="sectors"
          item-title="name"
          item-value="id_secteurs_activites"
          label="Filter by sectors"
          @change="fetchStandsDatas"
          class="sector-select"
          multiple
        ></v-select>

        <!-- Champ de sélection multiple pour les tags -->
        <v-select
          v-model="selectedTags"
          :items="tags"
          item-title="tagname"
          item-value="id_tag"
          label="Filter by tags"
          @change="fetchStandsDatas"
          class="tag-select"
          multiple
        ></v-select>
      </div>

      <v-row class="card-row">
        <v-col
          v-for="(stand, index) in filteredStands"
          :key="stand.id_company"
          class="card-col"
        >
          <custom-card
            :color="stand.color"
            :name="stand.name"
            :logo="logos[stand.id_company] ? `${logos[stand.id_company]}` : '../assets/default_logo.png'"
            :backgroundImage="backgrounds[stand.id_company] ? `${backgrounds[stand.id_company]}` : 'default_background.png'"
            :standId="stand.id_company"
          >
            <template v-slot:default>
              <p>{{ stand.description }}</p>
            </template>
          </custom-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>


<script>
import CustomCard from '@/components/forum/card.vue';

export default {
  components: {
    CustomCard,
  },
  data() {
    return {
      standsDatas: [],
      tags: [], // Ajouter une propriété pour les tags
      sectors: [], // Ajouter une propriété pour les secteurs d'activité
      selectedTags: [], // Ajouter une propriété pour les tags sélectionnés
      keyword: '', // Ajouter une propriété pour le mot-clé
      selectedSectors: [], // Ajouter une propriété pour les secteurs sélectionnés
      backgrounds: {}, // Stock les backgrounds des stands
      logos: {}, // Stock les logos des stands
    };
  },
  computed: {
    filteredStands() {
      let stands = this.standsDatas;

      if (this.selectedTags.length) {
        stands = stands.filter(stand =>
          stand.tags && this.selectedTags.some(tag => stand.tags.includes(tag))
        );
      }

      if (this.keyword) {
        stands = stands.filter(stand => stand.name.toLowerCase().includes(this.keyword.toLowerCase()));
      }

      if (this.selectedSectors.length) {
        stands = stands.filter(stand => this.selectedSectors.includes(stand.secteur_activite_id));
      }

      return stands;
    },
  },
  methods: {
    async fetchStandsDatas() {
      try {
        const response = await this.$apiForum.get(`api/company`, {
          params: {
            keyword: this.keyword, // Passer le mot-clé comme paramètre de requête
            sectorIds: this.selectedSectors.join(','), // Passer les IDs des secteurs d'activité comme paramètre de requête
            tagIds: this.selectedTags.join(',') // Passer les IDs des tags comme paramètre de requête
          }
        });
        this.standsDatas = response.data.map(company => ({
          ...company,
          tags: company.tags ? company.tags.split(',').map(Number) : []
        }));
        // Récupérer les backgrounds pour chaque stand
        for (let stand of this.standsDatas) {
          await this.fetchStandBackground(stand.id_company);
          await this.fetchStandLogo(stand.id_company);
        }
      } catch (error) {
        console.log("Erreur lors de la récupération des stands", error);
      }
    },
    async fetchTagsDatas() {
      try {
        const response = await this.$apiForum.get("api/tags");
        this.tags = response.data;
      } catch (error) {
        console.log("Erreur lors de la récupération des tags", error);
      }
    },
    async fetchSectors() {
      try {
        const response = await this.$apiConfigs.get("api/sectors");
        this.sectors = response.data;
      } catch (error) {
        console.log("Erreur lors de la récupération des secteurs d'activité", error);
      }
    },
    async fetchStandBackground(companyId) {
      try {
        const response = await this.$apiForum.get(`/api/company/${companyId}/background`, {
          responseType: 'blob' // Pour s'assurer que l'image est récupérée sous forme de blob
        });
        this.backgrounds = { ...this.backgrounds, [companyId]: URL.createObjectURL(response.data) };
      } catch (error) {
        console.log("Erreur lors de la récupération du background du stand", error);
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
    await this.fetchTagsDatas(); // Récupérer les tags lors du montage du composant
    await this.fetchSectors(); // Récupérer les secteurs d'activité lors du montage du composant
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.spe-selector {
  border-radius: 25px;
  margin: 30px 50px;
  width: 25vw;
  min-width: 200px;
}

.field-container {
  display: flex;
}
.keyword-input {
  margin: 20px;
}

.sector-select {
  margin: 20px;
}

.tag-select {
  margin: 20px;
}

.container {
  margin: 0 5vw;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.card-row {
  display: flex;
  flex-wrap: wrap;
}

.card-col {
  display: flex;
  justify-content: center; /* Center the card content horizontally */
}
</style>
