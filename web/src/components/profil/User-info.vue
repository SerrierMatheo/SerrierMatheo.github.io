<template>
  <div class="main">
    <div>
      <v-avatar :image="avatar" size="120px" v-if="hasAvatar">
        <slot name="avatar"></slot>
      </v-avatar>
      <v-avatar size="120px" v-else>
        <v-btn icon="mdi-plus" style="height: 100%; width: 100%;"></v-btn>
      </v-avatar>
    </div>
    <div class="info">
      <div class="name"><slot name="name"></slot></div>
      <div class="rouge"><slot name="email"></slot></div>
      <div class="rouge"><slot name="phone"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    avatar: {
      type: String,
      default: ""
    }
  },
  computed: {
    hasAvatar() {
      console.log('Avatar:', this.avatar);  // Ajouter ce log
      return this.avatar !== "";
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  border-radius: 25px;
  background-color: #F0ECEC;
  width: 45vw;
  filter: drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.25));
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.name {
  color: #555555;
  font-family: Roboto-Condensed, sans-serif;
  font-weight: normal;
  font-size: 35px;
}

.rouge {
  color: #E1081A;
  text-decoration: underline;
  text-decoration-color: #E1081A;
  font-family: 'Roboto-Condensed', sans-serif;
  font-size: 23px;
  font-weight: bold;
}
</style>
