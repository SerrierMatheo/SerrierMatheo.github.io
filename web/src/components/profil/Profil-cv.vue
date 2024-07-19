<template>
  <div class="container">
    <div class="dropzone" @click="triggerFileUpload" @dragover.prevent @dragenter.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop">
      <div v-if="!cv.cv_file">
        <div class="icon">
          <i class="fas fa-cloud-upload-alt"></i>
        </div>
        <p>Choose a file or drag it here.</p>
        <input type="file" ref="fileInput" @change="handleFileUpload" accept="application/pdf, application/x-pdf" style="display: none;" />
      </div>
      <div v-else>
        <div class="icon">
          <i class="fas fa-cloud-upload-alt"></i>
        </div>
        <p>Choose a file or drag it here to replace the current CV.</p>
        <input type="file" ref="fileInput" @change="handleFileUpload" accept="application/pdf, application/x-pdf" style="display: none;" />
      </div>
    </div>
    <button v-if="cv.cv_file" @click="viewCv" class="btn-view">Voir</button>
  </div>
</template>

<script>
import { useAppStore } from '@/stores/app'

export default {
  data() {
    return {
      cv: {
        cv_file: ""
      },
      isDragging: false
    };
  },
  computed: {
    appStore() {
      return useAppStore();
    }
  },
  methods: {
    async fetchUserCv(userId) {
      try {
        const response = await this.$apiProfile.get(`/api/profile/${userId}/cv`, {
          responseType: 'blob' // Pour s'assurer que le fichier est récupéré sous forme de blob
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        this.cv.cv_file = URL.createObjectURL(blob);
        console.log("CV fetched successfully", this.cv.cv_file);
      } catch (error) {
        console.log("Erreur lors de la récupération du CV de l'utilisateur", error);
      }
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && (file.type === 'application/pdf' || file.type === 'application/x-pdf')) {
        this.uploadCv(file);
      } else {
        alert('Please upload a PDF file.');
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
      if (file && (file.type === 'application/pdf' || file.type === 'application/x-pdf')) {
        await this.uploadCv(file);
      } else {
        alert('Please upload a PDF file.');
      }
    },
    async uploadCv(file) {
      try {
        const userId = this.appStore.userId; // Remplacez par l'ID de l'utilisateur actuel
        const formData = new FormData();
        formData.append('file', file);

        const response = await this.$apiProfile.post(`/api/profile/${userId}/upload_cv`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const blob = new Blob([file], { type: file.type });
        this.cv.cv_file = URL.createObjectURL(blob);
        console.log("CV uploaded successfully", this.cv.cv_file);
      } catch (error) {
        console.log("Erreur lors du téléchargement du CV", error);
      }
    },
    viewCv() {
      // Ouvrir le fichier dans un nouvel onglet
      window.open(this.cv.cv_file, '_blank');
    }
  },
  async mounted() {
    const userId = this.appStore.userId;
    await this.fetchUserCv(userId); // Appel à la méthode pour récupérer le CV
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

.btn-view {
  padding: 10px 15px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-view:hover {
  background-color: #555;
}

</style>
