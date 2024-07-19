<script>
export default{
  data() {
    return {
      tags: [],
      // dialog: false,
      // newTag: {
      //   tagname: '',
      // },
    };
  },
  methods: {
    async fetchTags(){
      try{
        const response = await this.$apiForum.get("/api/tags");
        this.tags = response.data;
      } catch (error) {
        console.log("Erreur lors de la récupération des utilisateurs", error);
      }
    },
    async deleteTag(id) {
      try {
        await this.$apiForum.delete(`/api/tags/${id}`);
        this.tags = this.tags.filter(tag => tag.id_tag !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression du tag:", error);
      }
    },
    // async addTag(){
    //   try{
    //     const response = await this.$apiForum.post("/api/tags", {
    //       ...this.newTag,
    //     });
    //     this.tags.push(response.data);
    //     this.dialog = false;
    //     this.newTag.tagname = '';
    //   } catch (error) {
    //     console.error("Erreur lors de l'ajout du tag:", error);
    //   }
    // }
  },
  mounted(){
    this.fetchTags();
  }
}
</script>

<template>
  <p>Liste des tags</p>

<v-container class="infos-container">
  <v-row>
    <v-col
          v-for="(tag, index) in tags"
          :key="index"
          cols="12"
          md="4"
        >
        <v-card >
              <v-card-title> {{ tag.tagname }}</v-card-title>
              <v-card-subtitle>id: {{ tag.id_tag }}</v-card-subtitle>
              <v-card-actions>
                <v-btn color="red" @click="deleteTag(tag.id_tag)">Supprimer</v-btn>
              </v-card-actions>
            </v-card>
      </v-col>
      <!-- <v-col>
        <v-card @click="dialog = true">
          <v-card-title>
            Ajouter
          </v-card-title>
        </v-card>
      </v-col> -->
  </v-row>
  </v-container>

  <!-- <v-dialog v-model="dialog" max-width="500px">
    <v-card>
        <v-card-title>
          <span class="headline">Nouveau tag</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newTag.tagname"
                  label="Nom du nouveau tag"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text="" @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text="" @click="addTag">Ajouter</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog> -->
</template>

<style scoped>
.infos-container {
  padding-bottom: 100px; /* Ensure some padding at the bottom to avoid footer overlap */
}
</style>
