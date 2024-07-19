<template>
  <v-card class="offer-card">
    <div class="offer-content">
      <div class="offer-details">
        <v-card-title class="offer-type">
          <slot name="type">{{ type }}</slot>
        </v-card-title>
        <v-card-subtitle class="offer-title">
          <slot name="title">{{ title }}</slot>
        </v-card-subtitle>
      </div>
      <v-spacer></v-spacer>
      <v-card-actions class="arrow-button">
        <v-btn icon @click="openDialog">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
    </div>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ title }}</span>
        </v-card-title>
        <v-card-subtitle>
          <p>Type : {{ type }}</p>
        </v-card-subtitle>
        <v-card-text>
          <p>{{this.file}}</p>
        </v-card-text>
        <v-card-text>
          <v-btn @click="viewOffer" color="primary">Télécharger l'offre</v-btn>
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
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    file: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    viewOffer() {
      window.open(this.file, '_blank');
    }
  }
};
</script>

<style scoped>
.offer-card {
  margin-bottom: 20px;
  border-radius: 25px;
  background-color: #D9D9D9;
  padding: 15px 20px;
}

.offer-content {
  display: flex;
  align-items: center;
}

.offer-details {
  flex: 1;
}

.offer-type,
.offer-title {
  font-size: 1.5rem;
}

.arrow-button v-icon {
  font-size: 1.5rem;
}
</style>
