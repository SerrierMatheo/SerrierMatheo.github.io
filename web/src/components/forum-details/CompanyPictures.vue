<template>
  <div v-if="this.pictures.length > 0" class="main">
    <div class="d-flex justify-content-center">
      <v-slide-group show-arrows multiple class="slide-group">
        <v-slide-item
          v-for="picture in pictures"
          :key="picture.id_picture"
        >
          <CompanyPictureCard :picture="picture" />
        </v-slide-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
import CompanyPictureCard from './CompanyPictureCard.vue';

export default {
  components: {
    CompanyPictureCard
  },
  props: {
    companyId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pictures: []
    };
  },
  methods: {
    async fetchPictures() {
      try {
        const response = await this.$apiForum.get(`/api/company/${this.companyId}/pictures`);
        this.pictures = response.data;
      } catch (error) {
        console.log("Error while fetching pictures", error);
      }
    }
  },
  async created() {
    await this.fetchPictures();
  }
};
</script>

<style scoped>
.main {
  margin: 10px 40px;
  padding: 2vh 2vw;
}

.slide-group {
  margin: 0 auto; /* Centre le slide-group horizontalement */
}
</style>
