<template>
  <v-card class="picture-card" :style="{ backgroundImage: 'url(' + picture_display + ')' }" @click="openDialog">
    <v-dialog v-model="dialog" max-width="90%">
      <v-card>
        <v-card-title class="headline">{{ picture.alt }}</v-card-title>
        <v-card-text>
          <v-img :src="picture_display"></v-img>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    picture: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      picture_display: "",
      dialog: false
    };
  },
  computed: {
    has_picture_display() {
      return this.picture_display !== "";
    }
  },
  methods: {
    async fetchPicture() {
      try {
        const response = await this.$apiForum.get(`/api/company/${this.picture.company_id}/picture/${this.picture.id_picture}`, {
          responseType: 'blob' // Pour s'assurer que l'image est récupérée sous forme de blob
        });
        this.picture_display = URL.createObjectURL(response.data);
      } catch (error) {
        console.log("Erreur lors de la récupération de l'image", error);
      }
    },
    openDialog() {
      this.dialog = true;
    }
  },
  async mounted() {
    await this.fetchPicture(); // Charger l'image lorsque le composant est monté
  }
};
</script>

<style scoped>
.picture-card {
  width: 300px;
  height: 300px;
  overflow: hidden;
  cursor: pointer;
  margin: 10px;
  background-size: cover;
  background-position: center;
}
</style>
