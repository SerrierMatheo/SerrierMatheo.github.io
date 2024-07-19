<script>
export default {
  data() {
    return {
      formations: [],
      dialog: false,
      newFormation: {
        nom: '',
        date_agenda: ''
      },
    };
  },
  methods: {
    async fetchFormations() {
      try {
        const response = await this.$apiConfigs.get("/api/formations");
        this.formations = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error);
      }
    },
    async deleteFormation(id) {
      try {
        await this.$apiConfigs.delete(`/api/formations/${id}`);
        this.formations = this.formations.filter(formation => formation.id_formation !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de la formation:", error);
      }
    },
    formatDate(dateString) {
      const [datePart, timePart] = dateString.split('T');
      const [year, month, day] = datePart.split('-');
      let [hours, minutes] = timePart.split(':');
      return `${day}/${month}/${year} à ${hours}:${minutes}`;
    },
    formatToISO(dateString) {
      const [date, time] = dateString.split(' ');
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}T${time}:00`;
    },
    async addFormation() {
      try {
        const formattedDate = this.formatToISO(this.newFormation.date_agenda);
        const response = await this.$apiConfigs.post("/api/formations", {
          ...this.newFormation,
          date_agenda: formattedDate
        });
        this.formations.push(response.data);
        this.dialog = false;
        this.newFormation.nom = '';
        this.newFormation.date_agenda = '';
      } catch (error) {
        console.error("Erreur lors de l'ajout de la formation:", error);
      }
    }
  },
  mounted() {
    this.fetchFormations();
  }
}
</script>

<template>
  <div>
    <p>Formations</p>
    <v-container class="formationsContainer">
      <v-row>
        <v-col
          v-for="(formation, index) in formations"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card>
            <v-card-title>
              {{ formation.nom }}
            </v-card-title>
            <v-card-subtitle>
              {{ formatDate(formation.date_agenda) }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="red" @click="deleteFormation(formation.id_formation)">Supprimer</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card @click="dialog = true">
            <v-card-title>
              Ajouter une nouvelle formation
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Nouvelle Formation</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newFormation.nom"
                  label="Nom de la formation"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newFormation.date_agenda"
                  label="Date de la formation (JJ/MM/AAAA HH:mm)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="addFormation">Ajouter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.formationsContainer {
  margin-bottom: 100px;
}

</style>
