<template>
  <div class="main">
    <UserInfo :avatar="user.avatar">
      <template v-slot:avatar>
        <div class="avatar-container" @mouseover="showEdit = true" @mouseleave="showEdit = false">
          <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
          <div class="edit-overlay" v-if="showEdit" @click="triggerFileUpload">
            Modifier
          </div>
          <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;" />
        </div>
      </template>
      <template v-slot:name>
        {{ user.name }} {{ user.firstname }}
      </template>
      <template v-slot:email>
        {{ user.mail }}
      </template>
      <template v-if="user.phone" v-slot:phone>
        {{ user.phone }}
      </template>
    </UserInfo>

    <div>
      <menu-selector :menu-items="menuItems" style="margin: 40px 50px">
        <template v-slot:profil>
          <ProfilUpdate :user="user" @update:prenom="user.firstname = $event" @update:nom="user.name = $event" @update:telephone="user.phone = $event" @update:titre="user.title = $event" @update:companyName="user.company_name = $event" />
        </template>
        <template v-if="user.type === 'participant'" v-slot:cv>
          <ProfilCv :cv-files="user.cv_files" />
        </template>
      </menu-selector>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/profil/User-info.vue";
import MenuSelector from "@/components/menu-selector.vue";
import ProfilUpdate from "@/components/profil/Profil-update.vue";
import ProfilCv from "@/components/profil/Profil-cv.vue";
import { useAppStore } from '@/stores/app';

export default {
  components: {
    ProfilCv,
    ProfilUpdate,
    UserInfo,
    MenuSelector,
  },
  data() {
    return {
      user: {
        id_user: null,
        username: null,
        type: null,
        cgu: false,
        name: "",
        firstname: "",
        mail: "",
        phone: "",
        avatar: "", // Initialement vide, sera mis à jour après l'appel API
        cv_files: "", // Ajout de la propriété cv_files pour les participants
      },
      menuItems: [
        { name: "profil", label: "Mon profil" },
      ],
      showEdit: false,
    };
  },
  computed: {
    appStore() {
      return useAppStore();
    }
  },
  methods: {
    async fetchUserProfile(userId) {
      try {
        const response = await this.$apiProfile.get(`/api/profile/${userId}`);
        const data = response.data;

        // Mettre à jour les données utilisateur
        this.user = {
          ...this.user,
          id_user: data.id_user,
          username: data.username,
          type: data.type,
          cgu: data.cgu,
          name: data.name,
          firstname: data.firstname,
          mail: data.mail,
          phone: data.phone,
          avatar: data.picture, // Mettre à jour l'avatar avec le chemin de l'image
          ...data.formation && { formation: data.formation }, // Ajouter la formation si elle existe
          ...data.company_name && { company_name: data.company_name }, // Ajouter le nom de la compagnie si elle existe
          ...data.title && { title: data.title }, // Ajouter le titre si il existe
          ...data.cv_files && { cv_files: data.cv_files } // Ajouter les fichiers CV si ils existent
        };

        // Mettre à jour les éléments du menu en fonction du type de l'utilisateur
        if (this.user.type === 'participant') {
          this.menuItems = [
            { name: "profil", label: "Mon profil" },
            { name: "cv", label: "Mon CV" },
          ];
        } else {
          this.menuItems = [
            { name: "profil", label: "Mon profil" },
          ];
        }
      } catch (error) {
        console.log("Erreur lors de la récupération des données de l'utilisateur", error);
      }
    },
    async fetchUserPicture(userId) {
      try {
        const response = await this.$apiProfile.get(`/api/profile/${userId}/picture`, {
          responseType: 'blob' // Pour s'assurer que l'image est récupérée sous forme de blob
        });
        this.user.avatar = URL.createObjectURL(response.data);
      } catch (error) {
        console.log("Erreur lors de la récupération de l'image de l'utilisateur", error);
      }
    },
    async uploadPicture(file) {
      try {
        const userId = this.appStore.userId;
        const formData = new FormData();
        formData.append('file', file);

        const response = await this.$apiProfile.post(`/api/profile/${userId}/upload_picture`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Refetch user picture to see the change
        await this.fetchUserPicture(userId);
      } catch (error) {
        console.log("Erreur lors du téléchargement de l'image", error);
      }
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.uploadPicture(file);
      } else {
        alert('Please upload an image file.');
      }
    },
  },
  async mounted() {
    const userId = this.appStore.userId; // Remplacez par l'ID de l'utilisateur actuel
    await this.fetchUserProfile(userId);
    await this.fetchUserPicture(userId);
  },
};
</script>

<style scoped>
.main {
  margin: 30px 50px;
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.user-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
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
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 18px;
  cursor: pointer;
}
</style>
