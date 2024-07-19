<script>
export default {
  data() {
    return {
      secteurs: [],
      dialog: false,
      newsecteur: {
        name: '',
      },
    };
  },
  methods: {
    async fetchsecteurs() {
      try {
        const response = await this.$apiConfigs.get("/api/sectors");
        this.secteurs = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des secteurs:", error);
      }
    },
    async deletesecteur(id) {
      try {
        await this.$apiConfigs.delete(`/api/sectors/${id}`);
        this.secteurs = this.secteurs.filter(secteur => secteur.id_secteurs_activites !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de la secteur:", error);
      }
    },
    async addsecteur() {
      try {
        const response = await this.$apiConfigs.post("/api/sectors", {
          ...this.newsecteur,
        });
        this.secteurs.push(response.data);
        this.dialog = false;
        this.newsecteur.name = '';
      } catch (error) {
        console.error("Erreur lors de l'ajout de la secteur:", error);
      }
    }
  },
  mounted() {
    this.fetchsecteurs();
  }
}
</script>

<template>
  <div>
    <p>secteurs</p>
    <v-container class="SectorsContainer">
      <v-row>
        <v-col
          v-for="(secteur, index) in secteurs"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card>
            <v-card-title>
              {{ secteur.name }}
            </v-card-title>
            <v-card-actions>
              <v-btn color="red" @click="deletesecteur(secteur.id_secteurs_activites)">Supprimer</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card @click="dialog = true">
            <v-card-title>
              Ajouter une nouvelle secteur
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Nouvelle secteur</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newsecteur.name"
                  label="Nom de la secteur"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text="" @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text="" @click="addsecteur">Ajouter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style>
.SectorsContainer{
  padding-bottom: 100px;;
}
</style>