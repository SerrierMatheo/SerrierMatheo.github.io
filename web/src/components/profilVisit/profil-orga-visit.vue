<template>
  <div>
    <div class="info-organisateur">
      <p>PROFIL ORGANISATEUR</p>

      <div class="form">
        <div class="form-group">
          <p>{{this.localTitre}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titre: {
      type: String,
      default: ''
    },
    companyName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localTitre: this.titre,
    };
  }
};
</script>

<style scoped>
.info-organisateur {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  width: 40vw;
}

.logo {
  display: block;
  margin: 0 auto 10px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}
</style>
