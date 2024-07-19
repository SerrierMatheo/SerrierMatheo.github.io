<script>
export default {
  data() {
    return {
      users: [],
      companies: [],
      selectedUser: null,
      dialogSuppr: false,
      dialogCreate: false,
      newUser: {
        username: '',
        type: '',
        company_id: '',
        name: '',
        firstname: '',
      },
      dialogPassword: false,
      password: '',
      selectedCompany: null,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.$apiUsers.get("/api/users");
        this.users = response.data;
      } catch (error) {
        console.log("Erreur lors de la récupération des utilisateurs", error);
      }
    },
    async fetchCompany() { // pour la liste des companies dans le formulaire de création d'utilisateur
      try {
        const response = await this.$apiForum.get("/api/company");
        this.companies = response.data;
      } catch (error) {
        console.log("Erreur lors de la récupération des entreprises", error);
      }
    },
    async deleteUser(id) {
      try {
        await this.$apiUsers.delete(`/api/users/${id}`);
        this.selectedUser = null;
        this.dialogSuppr = false;
        this.users = this.users.filter(user => user.id_user !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
      }
    },
    validateNewUser() {
      return this.newUser.username && this.newUser.type && this.selectedCompany && this.newUser.name && this.newUser.firstname;
    },
    async addUser() {
      if (!this.validateNewUser()) {
        alert("Veuillez remplir tous les champs.");
        return;
      }
      try {
        this.newUser.company_id = this.selectedCompany.id_company;
        const response = await this.$apiUsers.post("/api/users", this.newUser);
        this.users.push(response.data);
        this.password = response.data.plainPassword;
        this.dialogCreate = false;
        this.dialogPassword = true;
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
      }
    },
    async reset(){
      this.newUser = {
        username: '',
        type: '',
        company_id: '',
        name: '',
        firstname: '',
      };
      this.selectedCompany = null;
      this.fetchUsers();
    }
  },
  async mounted() {
    await this.fetchUsers();
    await this.fetchCompany();
  }
}
</script>

<template>
  <p>Liste des utilisateurs</p>
  <v-select
    :items="users"  
    label="Choisir"
    v-model="selectedUser"
    :item-title="item => `${item.name} ${item.firstname} - ${item.username}`"
    return-object
    single-line
  ></v-select>
  <v-container class="infos-container">
    <v-card v-if="selectedUser" class="my-4">
      <v-card-title class="headline">{{ selectedUser.username }}</v-card-title>
      <v-card-subtitle>id: {{ selectedUser.id_user }}</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <p><strong>Prénom:</strong> {{ selectedUser.firstname }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Nom:</strong> {{ selectedUser.name }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Type:</strong> {{ selectedUser.type }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Condition générales d'utilisation acceptées:</strong> {{ selectedUser.cgu }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Image:</strong> {{ selectedUser.picture }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Téléphone:</strong> {{ selectedUser.phone }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Mail:</strong> {{ selectedUser.mail }}</p>
          </v-col>
          <v-col>
            <v-card-actions>
              <v-btn color="red" @click="dialogSuppr = true">Supprimer l'utilisateur</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-btn @click="dialogCreate = true">Nouvel utilisateur</v-btn>

    <v-dialog v-model="dialogPassword" max-width="400">
      <v-card>
        <v-card-item>
          Voici le mot de passe du nouvel utilisateur {{ newUser.username }}, veuillez le noter et lui transmettre:
        </v-card-item>
        <v-card-text class="text-center">
          {{ password }}
        </v-card-text>
        <v-card-item>
          <v-btn @click="dialogPassword = false; reset()" block>Fermer</v-btn>
        </v-card-item>
      </v-card>
    </v-dialog>

  </v-container>

  <v-dialog v-model="dialogCreate" max-width="500px" class="dialogCreate">
    <v-card>
      <v-card-title>Créer un nouvel utilisateur</v-card-title>
      <v-card-item>
        <v-form>
          <v-text-field 
            v-model="newUser.username"
            label="Nom d'utilisateur"
            required
          ></v-text-field>
          <v-text-field 
            v-model="newUser.firstname"
            label="Prénom"
            required
          ></v-text-field>
          <v-text-field 
            v-model="newUser.name"
            label="Nom"
            required
          ></v-text-field>
          <v-radio-group v-model="newUser.type" inline>
            <v-radio label="admin" value="admin"></v-radio>
            <v-radio label="intervenant" value="intervenant"></v-radio>
          </v-radio-group>
          <v-select
            :items="companies"  
            label="Entreprise"
            item-title="name"
            v-model="selectedCompany"
            return-object
            single-line
            required
          ></v-select>
        </v-form>
      </v-card-item>
      <v-card-item>
        <v-btn class="mt-2" type="submit" block @click="addUser">Créer</v-btn>
      </v-card-item>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogSuppr" max-width="290">
    <v-card>
      <v-card-title class="headline">Suppression de l'utilisateur</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text="" @click="dialogSuppr = false">Annuler</v-btn>
        <v-btn color="blue darken-1" text="" @click="deleteUser(selectedUser.id_user)">Confirmer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.infos-container {
  padding-bottom: 100px; /* Ensure some padding at the bottom to avoid footer overlap */
}
</style>
