<script>
import MenuSelector from "@/components/menu-selector.vue";
import agenda from "@/components/agenda/agenda.vue";
import rdv from "@/components/agenda/rendez-vous.vue";
export default {
  components: {
    MenuSelector,
    agenda,
    rdv,
  },
  data(){
    return {
      menuItems: [
        { name: "agenda", label: "Mon agenda"},
        { name: "rdv", label: "Mes Rendez-vous"},
      ]
    };
  }
};
</script>

<template>
  <div>
    <menu-selector :menu-items="menuItems">
      <template v-slot:agenda>
        <agenda />
      </template>
      <template v-slot:rdv>
        <rdv />
      </template>
    </menu-selector>
  </div>
</template>

<style scoped>

</style>
