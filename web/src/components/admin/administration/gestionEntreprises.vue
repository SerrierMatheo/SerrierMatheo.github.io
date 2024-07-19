<script>
export default{
  data() {
    return {
      companies: [],
      secteurs_activites: [],
      selectedCompany: null,
      dialogSuppr: false,
      dialogCreate: false,
      newCompany: {
        name: '',
        secteur_activite_id: '',
      },
      selectedSecteur: null,
    };
  },
  methods: {
    async fetchCompany(){
      try{
        const response = await this.$apiForum.get("/api/company");
        this.companies = response.data;
      } catch (error) {
        console.log("Erreur lors de la récupération des entreprises", error);
      }
    },
    async fetchSecteursActivites(){
      try{
        const response = await this.$apiConfigs.get("/api/sectors");
        this.secteurs_activites = response.data;
      } catch (error) {
        console.log("Erreur lors de la récupération des secteurs d'activités", error);
      }
    },

    async deleteCompany(id){
      try{
        await this.$apiForum.delete(`/api/company/${id}`); //ne fonctionne pas, récupérer l'id
        this.companies = this.companies.filter(company => company.id_company !== id);
        this.selectedCompany = null;
        this.dialogSuppr = false;
      } catch (error) {
        console.error("Erreur lors de la suppression de l'entreprise", error);
      }
    },
    validateNewCompany(){
      return this.newCompany.name && this.selectedSecteur;
    },
    async addCompany(){
      if (!this.validateNewCompany()) {
        alert("Veuillez remplir tous les champs.");
        return;
      }
      try{
        this.newCompany.secteur_activite_id = this.selectedSecteur.id_secteurs_activites;
        const response = await this.$apiForum.post("/api/company", this.newCompany);
        this.companies.push(response.data);
        this.dialogCreate = false;
        this.newCompany.name = '';
        this.newCompany.secteur_activite_id = '';
        this.selectedSecteur = null;
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'entreprise", error);
      }
    }
  },
  async mounted(){
    await this.fetchCompany();
    await this.fetchSecteursActivites();
  }
}

</script>

<template>
<p>Liste des entreprises</p>
<v-select

:items="companies"  
label="Choisir"
item-title = "name"
v-model="selectedCompany"
return-object
single-line
></v-select>
<v-container class="infos-container">
<v-card v-if="selectedCompany" class="my-4">
      <v-card-title class="headline">{{ selectedCompany.name }}</v-card-title>
      <v-card-subtitle>id: {{ selectedCompany.id_company }}</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <p><strong>Description:</strong> {{ selectedCompany.description }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Pays:</strong> {{ selectedCompany.country }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Année de création:</strong> {{ selectedCompany.foundation_date }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Nombre d'employés:</strong> {{ selectedCompany.employees }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Capital (€) :</strong> {{ selectedCompany.revenue }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Site web:</strong> <a :href="selectedCompany.website" target="_blank">{{ selectedCompany.website }}</a></p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Secteur d'activité:</strong> {{ selectedCompany.secteur_activite_id }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Couleur:</strong> {{ selectedCompany.color }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Background:</strong> {{ selectedCompany.background }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Vidéo:</strong> {{ selectedCompany.video }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Logo:</strong> {{ selectedCompany.logo }}</p>
          </v-col>
          <v-col>
            <v-card-actions>
              <v-btn color="red" @click="dialogSuppr = true">Supprimer l'entreprise</v-btn>
              <!-- <v-btn color="primary">Modifier</v-btn> -->
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-btn @click="dialogCreate = true">Ajouter une entreprise</v-btn>

  </v-container>

  <v-dialog v-model="dialogCreate" max-width="400">
    <v-card>
      <v-card-title class="headline">Ajout d'une entreprise</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field 
            v-model="newCompany.name" 
            label="Nom de l'entreprise"
            required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-select

            :items="secteurs_activites"  
            label="Secteur d'activité"
            item-title = "name"
            item-value = "id_secteurs_activites"
            v-model="selectedSecteur"
            return-object
            single-line
            required
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text="" @click="dialogCreate = false">Annuler</v-btn>
        <v-btn color="blue darken-1" type="submit" text="" @click="addCompany">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogSuppr" max-width="290">
    <v-card>
      <v-card-title class="headline">Suppression de l'entreprise</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <p>Êtes-vous sûr de vouloir supprimer cette entreprise ?</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text="" @click="dialogSuppr = false">Annuler</v-btn>
        <v-btn color="blue darken-1" text="" @click="deleteCompany(selectedCompany.id_company)">Confirmer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<style scoped>
.my-4 {
  margin: 16px 0;
}
.infos-container {
  padding-bottom: 100px; /* Ensure some padding at the bottom to avoid footer overlap */
}
v-container {
  max-width: 100%;
  min-width: 50;
  overflow-y: auto;
  padding-bottom: 50px; /* Ensure some padding at the bottom to avoid footer overlap */
}
</style>
