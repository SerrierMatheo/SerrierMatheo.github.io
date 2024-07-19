<template>
    <v-card class="intervenant-card">
        <v-avatar :image="avatar" size="120px"></v-avatar>
        <v-card-title class="intervenant-title">

        {{ intervenant.firstname }} {{ intervenant.name }}</v-card-title>
      <v-card-text>
        <div class="intervenant-item">{{ intervenant.title }}</div>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'IntervenantCard',
    props: {
      intervenant: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        avatar: "", // Initialement vide
      };
    },
    computed: {
      hasAvatar() {
        return this.avatar !== "";
      }
    },
    methods: {
      async fetchAvatar() {
        try {
            const response = await this.$apiProfile.get(`/api/profile/${this.intervenant.id_user}/picture`, {
            responseType: 'blob' // Pour s'assurer que l'image est récupérée sous forme de blob
            });
            this.avatar = URL.createObjectURL(response.data);
        } catch (error) {
          console.log("Erreur lors de la récupération de l'avatar", error);
        }
      }
    },
    async mounted() {
      await this.fetchAvatar(); // Charger l'avatar lorsque le composant est monté
    }
  };
  </script>
  
  <style scoped>
  .intervenant-card {
    height: 250px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
  
  .intervenant-title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0;
  }
  
  .intervenant-item {
    font-size: 16px;
    color: #757575;
    text-align: center;
  }
  </style>
  