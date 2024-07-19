<template>
  <div class="main">
    <UserInfoVisit :avatar="user.avatar">
      <template v-slot:avatar>
        <div class="avatar-container">
          <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
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
    </UserInfoVisit>

    <div>
      <menu-selector :menu-items="menuItems" style="margin: 40px 50px">
        <template v-slot:profil>
          <ProfilVisit :user="user"/>
        </template>
        <template v-if="user.type === 'participant'" v-slot:cv>
          <ProfilCvVisit :cv-files="user.cv_files" />
        </template>
      </menu-selector>
    </div>
  </div>
</template>

<script>
import UserInfoVisit from "@/components/profilVisit/User-info-visit.vue";
import MenuSelector from "@/components/menu-selector.vue";
import ProfilVisit from "@/components/profilVisit/Profil-visit.vue";
import ProfilCvVisit from "@/components/profilVisit/Profil-cv-Visit.vue";
import { useAppStore } from '@/stores/app';

export default {
  components: {
    ProfilCvVisit,
    ProfilVisit,
    UserInfoVisit,
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
        { name: "profil", label: "profil" },
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
    async fetchUserProfile() {
      try {
        const response = await this.$apiProfile.get(`/api/profile/${this.$route.params.id}`);
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
            { name: "profil", label: "Profil" },
            { name: "cv", label: "CV" },
          ];
        } else {
          this.menuItems = [
            { name: "profil", label: "profil" },
          ];
        }
      } catch (error) {
        console.log("Erreur lors de la récupération des données de l'utilisateur", error);
      }
    },
    async fetchUserPicture() {
      try {
        const response = await this.$apiProfile.get(`/api/profile/${this.$route.params.id}/picture`, {
          responseType: 'blob' // Pour s'assurer que l'image est récupérée sous forme de blob
        });
        this.user.avatar = URL.createObjectURL(response.data);
      } catch (error) {
        console.log("Erreur lors de la récupération de l'image de l'utilisateur", error);
      }
    },
  },
  async mounted() {
    await this.fetchUserProfile();
    await this.fetchUserPicture();
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
</style>
