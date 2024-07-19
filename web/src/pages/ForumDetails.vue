<template>
  <div class="main">
    <div v-if="stand">
      <CompanyInfo
        :stand="stand"
        :isEditMode="isEditMode"
        :tags="tags"
        :allTags="allTags"
        :selectedTag="selectedTag"
        :newTagName="newTagName"
        @toggle-edit-mode="toggleEditMode"
        @save-changes="saveChanges"
        @delete-tag="deleteTag"
        @handle-submit="handleSubmit"
        @update:selectedTag="selectedTag = $event"
        @update:newTagName="newTagName = $event"
      />

      <!-- Sections and other components to be added here later -->

      <CompanyPictures
        :companyId="this.$route.params.id"/>

      <CompanyIntervenants
        :companyId="this.$route.params.id"
      />

      <!-- Company Offers Component -->
      <CompanyOffers :companyId="stand.id_company" />

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
import CompanyInfo from '@/components/forum-details/CompanyInfo.vue';
import CompanyIntervenants from '@/components/forum-details/CompanyIntervenants.vue';
import CompanyPictures from '@/components/forum-details/CompanyPictures.vue';
import CompanyOffers from '@/components/forum-details/CompanyOffers.vue';

export default {
  components: {
    CompanyInfo,
    CompanyIntervenants,
    CompanyPictures,
    CompanyOffers,
  },
  data() {
    return {
      stand: {}, // Initialiser comme un objet vide
      initialStand: {}, // Stocke l'état initial
      tags: [],
      allTags: [],
      selectedTag: '',
      newTagName: '',
      error: null,
      isEditMode: false,
    };
  },
  methods: {
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
    async saveChanges() {
      const updatedFields = {};
      for (const key in this.stand) {
        if (key !== 'logo' && key !== 'background' && this.stand[key] !== this.initialStand[key]) {
          updatedFields[key] = this.stand[key];
        }
      }
      if (Object.keys(updatedFields).length > 0) {
        try {
          const response = await this.$apiForum.put(`api/company/${this.$route.params.id}`, updatedFields);
          this.stand = { ...this.stand, ...response.data.company, logo: this.stand.logo, background: this.stand.background }; // Mettre à jour les champs modifiés, mais garder le logo et le background intacts
          this.initialStand = { ...this.stand }; // Mettre à jour l'état initial
          this.isEditMode = false; // Sortir du mode édition après sauvegarde
        } catch (error) {
          this.error = "Erreur lors de la sauvegarde des modifications.";
          console.error(error);
        }
      } else {
        this.isEditMode = false; // Sortir du mode édition même s'il n'y a pas de modifications
        await this.fetchStandDetails();
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
    async fetchStandDetails() {
      try {
        const response = await this.$apiForum.get(`api/company/${this.$route.params.id}`);
        this.stand = response.data;
        this.initialStand = { ...response.data }; // Stocker l'état initial
        await this.fetchStandLogo(); // Fetch logo after fetching stand details
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
    async fetchTags() {
      try {
        const response = await this.$apiForum.get(`api/company/${this.$route.params.id}/tags`);
        this.tags = response.data;
      } catch (error) {
        this.error = "Erreur lors de la récupération des tags.";
        console.error(error);
      }
    },
    async fetchAllTags() {
      try {
        const response = await this.$apiForum.get("api/tags");
        this.allTags = response.data;
      } catch (error) {
        this.error = "Erreur lors de la récupération des tags.";
        console.error(error);
      }
    },
  },
  async created() {
    await this.fetchStandDetails();
    await this.fetchTags();
    await this.fetchAllTags();
  },
};
</script>

<style scoped>
/* No style for now */
.main{
  padding-bottom: 200px;
}
</style>
