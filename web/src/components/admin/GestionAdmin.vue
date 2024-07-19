<template>
  <h2>Interface de gestion administrateur</h2>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-list dense>
          <v-list-item-group v-model="selectedMenuItem" active-class="selected-item">
            <v-list-item
              v-for="item in menuItems"
              :key="item.name"
              @click="selectMenuItem(item.name)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.label }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="9">
        <component :is="selectedMenuItemComponent" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import gestionEntreprises from '@/components/admin/administration/gestionEntreprises.vue'
import gestionUsers from '@/components/admin/administration/gestionUsers.vue'
import gestionTags from '@/components/admin/administration/gestionTags.vue'

export default {
  name: 'GestionAdmin',
  components: {
    gestionEntreprises,
    gestionUsers,
    gestionTags,
  },
  setup() {
    const selectedMenuItem = ref('general-settings');
    const menuItems = ref([
      { name: 'gestion-Users', label: 'Gestion des utilisateurs' },
      { name: 'gestion-Entreprises', label: 'Gestion des entreprises' },
      { name: 'gestion-Tags', label: 'Gestion des tags' },
    ]);

    return {
      menuItems,
      selectedMenuItem,
    };
  },
  methods: {
    selectMenuItem(name) {
      this.selectedMenuItem = name;
    }
  },
  computed: {
    selectedMenuItemComponent() {
      switch (this.selectedMenuItem) {
        case 'gestion-Users':
          return 'gestionUsers';
        case 'gestion-Entreprises':
          return 'gestionEntreprises';
        case 'gestion-Tags':
          return 'gestionTags';
        default:
          return 'gestionUsers';
      }
    }
  }
};
</script>

<style scoped>
.v-list {
  height: 100%;
  /* background-color: blueviolet;
  height: 500px; */
}
.selected-item {
  background-color: #1976D2; /* Couleur de fond pour l'élément sélectionné */
  color: white; /* Couleur du texte pour l'élément sélectionné */
}

</style>
