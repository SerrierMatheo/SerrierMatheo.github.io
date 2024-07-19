<template>
  <div>
    <p>Paramètres généraux</p>
    <v-list>
      <v-list-item v-for="(config, index) in configs" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ config.key }}</v-list-item-title>
          <v-list-item-subtitle>
            <v-text-field
              v-model="config.value"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-btn @click="validateAllConfigs" color="primary">Valider</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      configs: []
    };
  },
  methods: {
    async fetchConfigs() {
      try {
        const response = await this.$apiConfigs.get("/api/configs");
        this.configs = response.data;
      } catch (error) {
        console.log("Erreur lors de la récupération des configurations", error);
      }
    },
    async validateAllConfigs() {
      try {
        const updateFields = {};
        this.configs.forEach(config => {
          updateFields[config.key] = config.value;
        });
        const response = await this.$apiConfigs.put("/api/configs", updateFields);
        console.log("Configurations mises à jour:", response.data);
        await this.fetchConfigs(); // rafraîchir la liste des configurations
      } catch (error) {
        console.log("Erreur lors de la mise à jour des configurations", error);
      }
    }
  },
  mounted() {
    this.fetchConfigs();
  }
};
</script>

<style scoped>
</style>
