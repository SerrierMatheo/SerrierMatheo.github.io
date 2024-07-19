<template>
  <div class="table-container">
    <v-table>
      <thead>
      <tr>
        <th>Nom Prénom</th>
        <th>Spécialité</th>
        <th>Niveau</th>
        <th>Évaluation</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <slot :name="item.slotName" :item="item" :on-click="onClick"></slot>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    onClick: {
      type: Function,
      required: true
    }
  }
};
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
