<script>
export default {
  props: {
    prenom: {
      type: String,
      default: ''
    },
    nom: {
      type: String,
      default: ''
    },
    telephone: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      countryCode: '+33'
    };
  }
};
</script>

<template>
  <div class="info-perso">
    <p>INFORMATIONS PERSONNELLES</p>

    <div class="form">
      <div class="form-group">
        <p>{{ prenom }}</p>
      </div>
      <div class="form-group">
        <p>{{ nom }}</p>
      </div>
      <div class="form-group">
        <p>{{ countryCode }} {{ telephone }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-perso {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 40vw;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

p {
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.required {
  color: red;
}
</style>
