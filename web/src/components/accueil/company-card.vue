<template>
  <v-card class="card">
    <v-card-text class="card-body">
      <div v-if="logo" class="logo-container">
        <v-img :src="logo" class="logo" contain></v-img>
      </div>
      <div v-else class="logo-container">
        <h2>{{ name }}</h2>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CustomCard',
  props: {
    logo: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
  background-color: #f0f0f0; /* Gris clair */
  width: 200px;
  /* min-width: 200px; */
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* cursor: pointer; */
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.logo {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.card-body {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
