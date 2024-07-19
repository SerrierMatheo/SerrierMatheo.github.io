<template>
  <v-container>
    <p>Mes rendez-vous</p>
    <TableComponent :items="tableItems" :on-click="handleClick">
      <template v-slot:item1="{ item, onClick }">
        <td>{{ item.name }}</td>
        <td>{{ item.speciality }}</td>
        <td>{{ item.level }}</td>
        <td>
          <button class="btn" :class="item.evaluationClass" @click="onClick(item)">
            {{ item.evaluationText }}
          </button>
        </td>
      </template>
      <template v-slot:item2="{ item, onClick }">
        <td>{{ item.name }}</td>
        <td>{{ item.speciality }}</td>
        <td>{{ item.level }}</td>
        <td>
          <button class="btn" :class="item.evaluationClass" @click="onClick(item)">
            {{ item.evaluationText }}
          </button>
        </td>
      </template>
      <!-- Add more slots here if needed for other rows -->
    </TableComponent>
  </v-container>
</template>

<script>
import TableComponent from "@/components/agenda/TableComponent.vue";

export default {
  components: {
    TableComponent,
  },
  data(){
    return {
      tableItems: [
        { slotName: 'item1', name: 'John Doe', speciality: '', level: '2ème année', evaluationText: 'Modifier l\'évaluation', evaluationClass: 'btn-modify' },
        { slotName: 'item2', name: 'John Doe', speciality: '', level: '2ème année', evaluationText: 'Procéder à l\'évaluation', evaluationClass: 'btn-proceed' },
        // Add more items here
      ]
    };
  },
  methods: {
    handleClick(item) {
      if (item.evaluationText === 'Modifier l\'évaluation') {
        item.evaluationText = 'Procéder à l\'évaluation';
        item.evaluationClass = 'btn-proceed';
      } else {
        item.evaluationText = 'Modifier l\'évaluation';
        item.evaluationClass = 'btn-modify';
      }
    }
  }
};
</script>

<style scoped>
.btn {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.btn-modify {
  background-color: #2A2E46;
  color: white;
}

.btn-proceed {
  background-color: #FF3A4B;
  color: white;
}
</style>
