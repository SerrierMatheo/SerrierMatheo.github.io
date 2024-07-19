<template>
  <h2>Interface de configuration du forum</h2>
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
import GeneralSettings from '@/components/admin/configs/GeneralSettings.vue';
import Formations from '@/components/admin/configs/Formations.vue';
import Sectors from '@/components/admin/configs/Sectors.vue';

export default {
  name: 'Configurations',
  components: {
    GeneralSettings,
    Formations,
    Sectors,
  },
  setup() {
    const selectedMenuItem = ref('general-settings');
    const menuItems = ref([
      { name: 'general-settings', label: 'Paramètres généraux' },
      { name: 'formations', label: 'Formations' },
      { name: 'sectors', label: 'Secteurs d\'activités' },
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
        case 'general-settings':
          return 'GeneralSettings';
        case 'formations':
          return 'Formations';
        case 'sectors':
          return 'Sectors';
        default:
          return 'GeneralSettings';
      }
    }
  }
};
</script>

<style scoped>
.v-list {
  height: 100%;
}
.selected-item {
  background-color: #1976D2; /* Couleur de fond pour l'élément sélectionné */
  color: white; /* Couleur du texte pour l'élément sélectionné */
}
</style>
