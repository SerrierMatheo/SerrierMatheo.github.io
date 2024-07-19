<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>test</p>
    <div id="map"></div>
    <!--<editor-content :editor="editor" />-->
  </div>


</template>
<!--
<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    }
  },

  mounted() {
    this.editor = new Editor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit,
      ],
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>-->

<script setup lang="ts">
import leaflet from "leaflet"
import {onMounted} from "vue";

let map: leaflet.Map;


onMounted(() => {
  map = leaflet.map("map").setView([51.505, -0.09], 13);
  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Adresse que vous voulez géocoder
  const address = "27 Rue Philippe Séguin, 88000 Épinal";

  // Géocodage de l'adresse en utilisant l'API Adresse de la France ouverte
  fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}`)
    .then(response => response.json())
    .then(data => {
      // Récupérer les coordonnées géographiques
      const latlng = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]];

      // Ajouter un marqueur à la position géocodée
      leaflet.marker(latlng)
        .addTo(map)
        .bindPopup(address)
        .openPopup();

      // Centrer la carte sur les coordonnées géocodées
      map.setView(latlng, 13);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données de géocodage :', error);
    });
});
</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: block;
    align-items: center;
  }

  #map {
    width: 100%;
    height: 80vh;
  }
}
</style>