<template>
  <section class="main">
    <div
      class="logo-container"
      @mouseover="isEditMode ? showEditLogo = true : null"
      @mouseleave="isEditMode ? showEditLogo = false : null">
      <img :src="stand.logo" alt="Company Logo" class="company-logo" />
      <div class="edit-overlay" v-if="isEditMode && showEditLogo" @click="triggerFileUpload">
        Modifier
      </div>
      <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;" />
    </div>
    <div class="header">
      <div class="stand-name">{{ stand.name }}</div>
      <div class="tags">
        <v-btn
          v-for="tag in tags"
          :key="tag.id_tag"
          class="tag-btn"
          @click="isEditMode ? openTagDialog('delete', tag.id_tag) : null"
        >
          {{ tag.tagname }}
        </v-btn>
        <v-btn
          v-if="isEditMode && (isUserType('intervenant') || isUserType('admin'))"
          class="add-tag-btn"
          @click="openTagDialog('add')"
        >
          Ajouter
        </v-btn>
      </div>
      <v-btn class="edit-mode" v-if="isUserType('intervenant') || isUserType('admin')" @click="$emit('toggle-edit-mode')">
        {{ isEditMode ? 'Annuler' : 'Modifier' }}
      </v-btn>
    </div>

    <!-- Dialog pour ajouter/supprimer un tag -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ dialogMode === 'add' ? 'Ajouter un Tag' : 'Supprimer un Tag' }}</v-card-title>
        <v-card-text v-if="dialogMode === 'add'">
          <form @submit.prevent="handleTagAction">
            <select :value="selectedTag" @input="updateSelectedTag">
              <option disabled value="">Sélectionnez un tag</option>
              <option v-for="tag in allTags" :key="tag.id_tag" :value="tag.tagname">{{ tag.tagname }}</option>
              <option value="new">Nouveau</option>
            </select>
            <input v-if="selectedTag === 'new'" :value="newTagName" @input="updateNewTagName" placeholder="Nom du tag" required />
            <v-btn type="submit" color="primary">Ajouter</v-btn>
          </form>
        </v-card-text>
        <v-card-text v-else>
          Êtes-vous sûr de vouloir supprimer ce tag ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="primary" v-if="dialogMode === 'delete'" @click="handleTagAction">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Button to open v-dialog for modifying the background image -->
    <v-btn v-if="isEditMode" @click="showBackgroundDialog = true">
      Modifier l'image de la vignette
    </v-btn>

    <!-- Dialog to display current background image and upload new image -->
    <v-dialog v-model="showBackgroundDialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">Modifier l'image de la vignette</v-card-title>
        <v-card-text>
          <img :src="stand.background" alt="Current Background Image" class="current-background-image" v-if="stand.background"/>
          <div class="dropzone" @click="triggerBackgroundFileUpload" @dragover.prevent @dragenter.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop">
            <div v-if="!stand.background">
              <div class="icon">
                <i class="fas fa-cloud-upload-alt"></i>
              </div>
              <p>Choose a file or drag it here.</p>
              <input type="file" ref="backgroundFileInput" @change="handleBackgroundFileUpload" accept="image/*" style="display: none;" />
            </div>
            <div v-else>
              <div class="icon">
                <i class="fas fa-cloud-upload-alt"></i>
              </div>
              <p>Choose a file or drag it here to replace the current background image.</p>
              <input type="file" ref="backgroundFileInput" @change="handleBackgroundFileUpload" accept="image/*" style="display: none;" />
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showBackgroundDialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div>
      <h2 class="presentation-title">Présentation</h2>
      <div class="stand-datas" v-if="isEditMode">
        <div class="stand-description">
          <TextEditor v-model:content="stand.description" placeholder="Description de l'entreprise" />
        </div>
        <div>
          <input v-model="stand.country" placeholder="Pays de l'entreprise" />
          <input v-model="stand.foundation_date" placeholder="Date de fondation" />
          <input v-model="stand.employees" placeholder="Nombre d'employés" />
          <input v-model="stand.revenue" placeholder="Revenu" />
          <input v-model="stand.website" placeholder="Site web" />
          <v-btn @click="$emit('save-changes')">Sauvegarder</v-btn>
        </div>
      </div>
      <div class="stand-datas" v-else>
        <div class="stand-description">
          <p v-html="stand.description"></p>
        </div>
        <div class="stand-infos">
          <p>{{ stand.country }}</p>
          <p>Fondée en {{ stand.foundation_date }}</p>
          <p>{{ stand.employees }} employés</p>
          <p>€{{ stand.revenue }} de CA</p>
          <p>{{ stand.website }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useAppStore } from '@/stores/app';
import TextEditor from '@/components/TextEditor.vue';

export default {
  components: { TextEditor },
  data() {
    return {
      dialog: false,
      dialogMode: 'add', // or 'delete'
      tagToDelete: null,
      showEditLogo: false,
      showBackgroundDialog: false,
      isDragging: false,
    };
  },
  props: {
    stand: {
      type: Object,
      default: () => ({}),
    },
    isEditMode: Boolean,
    tags: {
      type: Array,
      default: () => [],
    },
    allTags: {
      type: Array,
      default: () => [],
    },
    selectedTag: String,
    newTagName: String,
  },
  methods: {
    isUserType(role) {
      return useAppStore().isUserType(role);
    },
    handleTagAction() {
      if (this.dialogMode === 'add') {
        if (this.selectedTag === 'new' && this.newTagName) {
          this.$emit('handle-submit', { tagname: this.newTagName });
        } else {
          this.$emit('handle-submit', { tagname: this.selectedTag });
        }
      } else if (this.dialogMode === 'delete') {
        this.$emit('delete-tag', this.tagToDelete);
      }
      this.dialog = false;
    },
    openTagDialog(mode, tagId = null) {
      this.dialogMode = mode;
      if (mode === 'delete') {
        this.tagToDelete = tagId;
      }
      this.dialog = true;
    },
    updateSelectedTag(event) {
      this.$emit('update:selectedTag', event.target.value);
    },
    updateNewTagName(event) {
      this.$emit('update:newTagName', event.target.value);
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.uploadLogo(file);
      } else {
        alert('Please upload an image file.');
      }
    },
    async uploadLogo(file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await this.$apiForum.post(`/api/company/${this.stand.id_company}/upload_logo`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Mettre à jour le logo de l'entreprise avec le nouveau logo téléchargé
        this.stand.logo = URL.createObjectURL(file);
      } catch (error) {
        console.log("Erreur lors du téléchargement du logo", error);
      }
    },
    async fetchStandBackground() {
      try {
        const response = await this.$apiForum.get(`/api/company/${this.$route.params.id}/background`, {
          responseType: 'blob' // Pour s'assurer que l'image est récupérée sous forme de blob
        });
        this.stand.background = URL.createObjectURL(response.data);
      } catch (error) {
        console.log("Erreur lors de la récupération du background du stand", error);
      }
    },
    triggerBackgroundFileUpload() {
      this.$refs.backgroundFileInput.click();
    },
    handleBackgroundFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.uploadBackground(file);
      } else {
        alert('Please upload an image file.');
      }
    },
    onDragOver() {
      this.isDragging = true;
    },
    onDragLeave() {
      this.isDragging = false;
    },
    async onDrop(event) {
      this.isDragging = false;
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        await this.uploadBackground(file);
      } else {
        alert('Please upload an image file.');
      }
    },
    async uploadBackground(file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await this.$apiForum.post(`/api/company/${this.stand.id_company}/upload_background`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Mettre à jour l'image de fond de l'entreprise avec la nouvelle image téléchargée
        this.stand.background = URL.createObjectURL(file);
      } catch (error) {
        console.log("Erreur lors du téléchargement de l'image de fond", error);
      }
    }
  },
  async created() {
    await this.fetchStandBackground();
  },
};
</script>

<style scoped>
.main {
  margin: 10px 40px;
  padding: 2vh 2vw;
}

.logo-container {
  position: relative;
  width: 35vw;
  height: 150px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #FF172B;
  background-color: transparent;
  border-radius: 50px;
  margin: 0 auto -10px;
}

.company-logo {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Pour que l'image s'adapte à la hauteur sans être déformée */
}

.edit-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.current-background-image {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.dropzone {
  width: 100%;
  max-width: 600px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  background-color: #f9f9f9;
  margin-bottom: 20px;
}

.dropzone.dragover {
  background-color: #e6f7ff;
  border-color: #1890ff;
}

.icon {
  margin-bottom: 10px;
  font-size: 50px;
  color: #ccc;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.stand-name {
  width: 33vw;
  height: 80px;
  border: 3px #E1081A solid;
  border-radius: 50px;
  background-color: #F5F5F5;
  color: #595959;
  font-family: Roboto-Condensed, sans-serif;
  font-weight: bold;
  font-size: 2rem;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-left: 0;
}

.edit-mode {
  height: 80px;
  width: 230px;
  background-color: #FF3A4B;
  color: white;
  border-radius: 35px;
  font-size: 1.5rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-btn {
  background-color: #e0e0e0;
  border-radius: 10px;
  padding: 5px 10px;
}

.add-tag-btn {
  background-color: #d3d3d3;
}

.presentation-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2A2E46;
  text-decoration: underline 3px #FF172B;
}

.stand-datas {
  display: flex;
  gap: 30px;
}

.stand-description {
  border: solid #A5A5A5 1px;
  border-radius: 25px;
  width: 45vw;
  padding: 25px 10px;
  margin-top: 10px;
}

.stand-infos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.stand-infos p {
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  color: #595959;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}
</style>
