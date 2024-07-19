<script>
import MenuSelector from "@/components/menu-selector.vue";
import GestionAdmin from "@/components/admin/GestionAdmin.vue";
import Statistiques from "@/components/admin/Statistiques.vue";
import Configurations from '@/components/admin/Configurations.vue'

export default {
  components: {
    Configurations,
    MenuSelector,
    GestionAdmin,
    Statistiques,
  },
  data(){
    return {
      menuItems: [
        { name: "admin", label: "Gestion administrateur"},
        { name: "configs", label: "configuration"},
        { name: "stats", label: "Statistiques"},
      ]
    };
  }
};
</script>

<template>
  <!-- menu sélèction du composant à afficher (gestion des utilisateurs, statistiques, ...) -->
  <h1>Gestion administrateur de l'application</h1>
  <div>
    <menu-selector :menu-items="menuItems">
      <template v-slot:admin>
        <GestionAdmin />
      </template>
      <template v-slot:configs>
        <Configurations />
      </template>
      <template v-slot:stats>
        <Statistiques />
      </template>
    </menu-selector>
  </div>
</template>

<style scoped>

</style>
