<template>
  <div>
    <!-- Menu de sélection des sous-menus -->
    <div class="parametre-menu">
      <button
        v-for="item in menuItems"
        :key="item.name"
        @click="selectSubMenu(item.name)"
        class="radio"
        :class="{ active: isSelectedSubMenu(item.name) }"
      >
        {{ item.label }}
      </button>
    </div>

    <!-- Contenu du sous-menu sélectionné -->
    <div class="parametre-content">
      <slot :name="selectedSubMenu"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      selectedSubMenu: this.menuItems.length > 0 ? this.menuItems[0].name : ""
    };
  },
  methods: {
    selectSubMenu(subMenu) {
      this.selectedSubMenu = subMenu;
    },
    isSelectedSubMenu(subMenu) {
      return this.selectedSubMenu === subMenu;
    }
  }
};
</script>

<style scoped>
.radio {
  margin: 15px;
  cursor: pointer;

  background-color: #a6a6a6;
  border-radius: 50px;
  padding: 10px 5vw;

  color: white;
  height: 80px;
  width: 20%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.radio.active {
  font-weight: bold;
  background-color: #FF3A4B;
}

.parametre-menu {
  margin-bottom: 20px;
  background-color: #2A2E46;
  border-radius: 25px;

  height: 80px;

  display: flex;
  gap: 15vw;
  justify-content: center;

  font-family: Roboto-Condensed, sans-serif;
  font-size: 1.75em;
  font-weight: bold;

  align-items: center;
}

.parametre-content {
  padding: 10px;
}
</style>

