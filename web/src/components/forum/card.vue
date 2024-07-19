<template>
  <v-card
    :style="{ backgroundImage: `url(${backgroundImage})` }"
    class="card"
    @mouseenter="onHover(true)"
    @mouseleave="onHover(false)"
    @click="goToStand(this.standId)"
  >
    <v-card-title :style="{ backgroundColor: color }" class="card-header">
      <div class="header-content">
        <span class="title">{{ name }}</span>
      </div>
    </v-card-title>
    <v-card-text class="card-body">
      <div class="logo-container">
        <v-img :src="logo" class="logo" contain></v-img>
      </div>
      <transition name="fade">
        <div v-if="isHovered" class="hover-content">
          <v-btn class="stand-button"  color="red" dark>
            Voir le stand
          </v-btn>
        </div>
      </transition>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CustomCard',
  props: {
    color: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    backgroundImage: {
      type: String,
      required: true
    },
    standId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isHovered: false
    };
  },
  methods: {
    onHover(isHovered) {
      this.isHovered = isHovered;
    },
    goToStand(id) {
      console.log(this.standId)
      this.$router.push({name: 'ForumDetails', params:{id: id}});
    }
  }
};
</script>


<style scoped>
.card {
  border-radius: 1rem;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  width: 20vw;
  min-width: 200px;
  transition: all 0.3s ease;
  height: 250px;
  margin-bottom: 50px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.card:hover {
  height: 300px;
  margin-bottom: 0;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.card-header {
  text-align: center;
  padding: 0.2em;
}

.title {
  display: block;
  color: black;
  font-weight: bold;
  text-align: center;
  background: #fff;
  border-radius: 0.5em 0.5em 0 0;
  width: 100%;
}

.logo-container {
  background-color: white;
  padding: 1em;
  border-radius: 1em;
  margin-top: 8em;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
}

.logo {
  max-height: 50px;
  max-width: 100%;
  object-fit: contain;
}

.card-body {
  padding: 10px;
  color: #fff;
}

.hover-content {
  text-align: center;
}

.stand-button {
  margin-top: -2em;
  text-transform: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
