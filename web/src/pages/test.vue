<template>
  <div>
    <div class="stand" v-if="stand">
      <div class="logo-container" v-if="stand.logo">
        <img :src="stand.logo" alt="Company Logo" class="company-logo" />
      </div>
      <div class="stand-name">{{ stand.name }}</div>
      <v-btn style="margin-left: 5vw" v-if="useAppStore().isUserType('intervenant') || useAppStore().isUserType('admin')" @click="toggleEditMode">
        {{ isEditMode ? 'Annuler' : 'Modifier' }}
      </v-btn>
      <div class="infos-stand">
        <div v-if="isEditMode">
          <textarea v-model="stand.description" placeholder="Description de l'entreprise"></textarea>
          <input v-model="stand.address" placeholder="Adresse de l'entreprise" />
          <input v-model="stand.country" placeholder="Pays de l'entreprise" />
          <input v-model="stand.foundation_date" placeholder="Date de fondation" />
          <input v-model="stand.employees" placeholder="Nombre d'employés" />
          <input v-model="stand.revenue" placeholder="Revenu" />
          <input v-model="stand.website" placeholder="Site web" />
          <v-btn @click="saveChanges">Sauvegarder</v-btn>
        </div>
        <div v-else>
          <p>{{ stand.description }}</p>
          <p>{{ stand.address }}</p>
          <p>{{ stand.country }}</p>
          <p>Fondée en {{ stand.foundation_date }}</p>
          <p>{{ stand.employees }} employés</p>
          <p>€{{ stand.revenue }} de CA</p>
          <p>{{ stand.website }}</p>
        </div>
        <div>
          <!-- Section pour afficher les tags -->
          <div v-if="tags.length">
            <h3>Tags</h3>
            <ul>
              <li v-for="tag in tags" :key="tag.id_tag">
                {{ tag.tagname }}
                <v-btn v-if="useAppStore().isUserType('intervenant') || useAppStore().isUserType('admin')" @click="deleteTag(tag.id_tag)">Supprimer</v-btn>
              </li>
            </ul>
          </div>
          <!-- Formulaire pour ajouter un tag -->
          <div v-if="useAppStore().isUserType('intervenant') || useAppStore().isUserType('admin')">
            <h3>Ajouter un Tag</h3>
            <form @submit.prevent="handleSubmit">
              <select v-model="selectedTag">
                <option disabled value="">Sélectionnez un tag</option>
                <option v-for="tag in allTags" :key="tag.id_tag" :value="tag.tagname">{{ tag.tagname }}</option>
                <option value="new">Nouveau</option>
              </select>
              <input v-if="selectedTag === 'new'" v-model="newTagName" placeholder="Nom du tag" required />
              <v-btn type="submit">Ajouter</v-btn>
            </form>
          </div>
        </div>
      </div>
      <!-- Affichage des sections -->
      <div class="sections">
        <div v-for="(section, index) in sections" :key="section.id_section" :class="{'section': true, 'reverse': index % 2 !== 0}">
          <p v-if="index % 2 === 0">{{ section.text }}</p>
          <img :src="section.picture_href" :alt="section.picture_alt" v-if="section.picture_href" style="width: 400px; height: auto;" />
          <p v-if="index % 2 !== 0">{{ section.text }}</p>
          <div v-if="isEditMode">
            <v-btn @click="deleteSection(section.id_section)">Supprimer la section</v-btn>
            <v-btn @click="editSection(section)">Modifier la section</v-btn>
          </div>
        </div>
        <!-- Bouton pour ajouter une nouvelle section -->
        <v-btn v-if="isEditMode" @click="addSection">Ajouter une section</v-btn>
      </div>
      <div class="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/h9Eu8FIpcVI?si=wUSYuB1LwPhiQBi_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <div>
        <!-- Section pour afficher les offres -->
        <div class="offers" v-if="offers.length">
          <h3>Offres</h3>
          <ul>
            <li v-for="offer in offers" :key="offer.id_offer">
              <h4>{{ offer.title }}</h4>
              <p>Type: {{ offer.type }}</p>
              <a :href="offer.file" target="_blank">Télécharger</a>
              <div v-if="isEditMode">
                <v-btn @click="deleteOffer(offer.id_offer)">Supprimer l'offre</v-btn>
                <v-btn @click="editOffer(offer)">Modifier l'offre</v-btn>
              </div>
            </li>
          </ul>
          <v-btn v-if="isEditMode" @click="addOffer">Ajouter une offre</v-btn>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { useAppStore } from '@/stores/app';

export default {
  data() {
    return {
      stand: null,
      tags: [], // Initialiser à un tableau vide
      allTags: [],
      selectedTag: '', // Tag sélectionné dans le menu déroulant
      newTagName: '', // Nom du nouveau tag
      error: null,
      isEditMode: false, // Propriété pour suivre le mode édition
      sections: [], // Propriété pour stocker les sections
      offers: [],
    };
  },
  methods: {
    useAppStore,
    async fetchStandDetails() {
      try {
        const response = await this.$apiForum.get(`api/company/${this.$route.params.id}`);
        this.stand = response.data;
      } catch (error) {
        this.error = "Erreur lors de la récupération des détails du stand.";
        console.error(error);
      }
    },
    async fetchStandLogo() {
      try {
        const response = await this.$apiForum.get(`/api/company/${this.$route.params.id}/logo`, {
          responseType: 'blob' // Pour s'assurer que l'image est récupérée sous forme de blob
        });
        this.stand.logo = URL.createObjectURL(response.data);
      } catch (error) {
        console.log("Erreur lors de la récupération du logo du stand", error);
      }
    },
    async fetchStandTags() {
      try {
        const response = await this.$apiForum.get(`api/company/${this.$route.params.id}/tags`);
        this.tags = response.data;
      } catch (error) {
        this.error = "Erreur lors de la récupération des tags du stand.";
        console.error(error);
      }
    },
    async fetchAllTags() {
      try {
        const response = await this.$apiForum.get("api/tags");
        this.allTags = response.data;
      } catch (error) {
        console.log("Erreur lors de la récupération des tags", error);
      }
    },
    async createTag() {
      try {
        const response = await this.$apiForum.post(`api/company/${this.$route.params.id}/tags/new`, {
          tagname: this.newTagName
        });
        this.tags.push(response.data); // Ajouter le nouveau tag à la liste
        this.newTagName = ''; // Réinitialiser le champ de saisie
        await this.fetchAllTags();
      } catch (error) {
        this.error = "Erreur lors de l'ajout du tag.";
        console.error(error);
      }
    },
    async addTag() {
      try {
        const response = await this.$apiForum.post(`api/company/${this.$route.params.id}/tags/add`, {
          tagname: this.selectedTag
        });
        this.tags.push(response.data); // Ajouter le nouveau tag à la liste
        this.selectedTag = ''; // Réinitialiser la sélection du menu déroulant
      } catch (error) {
        this.error = "Erreur lors de l'ajout du tag.";
        console.error(error);
      }
    },
    async deleteTag(tagId) {
      try {
        await this.$apiForum.delete(`api/company/${this.$route.params.id}/tags/${tagId}`);
        this.tags = this.tags.filter(tag => tag.id_tag !== tagId); // Supprimer le tag de la liste
      } catch (error) {
        this.error = "Erreur lors de la suppression du tag.";
        console.error(error);
      }
    },
    async handleSubmit() {
      if (this.selectedTag === 'new') {
        await this.createTag();
      } else {
        await this.addTag();
      }
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
    async saveChanges() {
      try {
        const response = await this.$apiForum.put(`api/company/${this.$route.params.id}`, this.stand);
        this.stand = response.data;
        this.isEditMode = false; // Sortir du mode édition après sauvegarde
      } catch (error) {
        this.error = "Erreur lors de la sauvegarde des modifications.";
        console.error(error);
      }
    },
    async fetchCompanySections() {
      try {
        const response = await this.$apiForum.get(`api/company/${this.$route.params.id}/sections`);
        this.sections = response.data;
      } catch (error) {
        this.error = "Erreur lors de la récupération des détails du stand.";
        console.error(error);
      }
    },
    async fetchCompanyOffers() {
      try {
        const response = await this.$apiForum.get(`api/company/${this.$route.params.id}/offers`);
        this.offers = response.data;
      } catch (error) {
        this.error = "Erreur lors de la récupération des détails du stand.";
        console.error(error);
      }
    },
  },
  watch: {
    selectedTag(newTag) {
      if (newTag !== 'new') {
        this.newTagName = '';
      }
    },
    '$route.params.id': function(newId) {
      this.fetchStandDetails();
      this.fetchStandLogo();
      this.fetchAllTags();
      this.fetchStandTags();
      this.fetchCompanySections();
      this.fetchCompanyOffers();
    }
  },
  mounted() {
    this.fetchStandDetails();
    this.fetchStandLogo();
    this.fetchAllTags();
    this.fetchStandTags();
    this.fetchCompanySections();
    this.fetchCompanyOffers();
  }
};
</script>

<style>
.stand {
  margin-top: 5vh;
  margin-bottom: 15vh;
  margin-left: 5vw;
  margin-right: 5vw;
  border: #A5A5A5 solid 1px;
  border-radius: 40px;
}

.logo-container {
  text-align: center;
  margin-top: 2vh;
}

.company-logo {
  max-width: 150px;
  height: auto;
  margin-bottom: 2vh;
}

.stand-name {
  margin: 5vh 5vw;
  color: #595959;
  font-size: 2rem;
  font-weight: bold;
  font-family: Roboto-Condensed, sans-serif;
  border: #FF172B solid 3px;
  border-radius: 50px;
  background-color: #F5F5F5;
  width: 15vw;
  padding: 2px 10px;
  justify-content: center;
}

.infos-stand {
  padding-left: 5vw;
  padding-top: 30px;
  display: flex;
  gap: 100px;
}

.sections,
.offers {
  margin: 50px 5vw;
}

.sections {
  display: block;
}

.section {
  display: flex;
  gap: 30px;
  border: #A5A5A5 solid 1px;
  border-radius: 25px;
  padding: 20px;
  margin-bottom: 2em;
}

.video-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
