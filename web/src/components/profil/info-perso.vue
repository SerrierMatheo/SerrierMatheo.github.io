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
      localPrenom: this.prenom,
      localNom: this.nom,
      localTelephone: this.telephone,
      countryCode: '+33'
    };
  },
  watch: {
    prenom(newVal) {
      this.localPrenom = newVal;
    },
    nom(newVal) {
      this.localNom = newVal;
    },
    telephone(newVal) {
      this.localTelephone = newVal;
    }
  },
  methods: {
    save() {
      // Ajoutez ici la logique pour sauvegarder les informations
      console.log({
        prenom: this.localPrenom,
        nom: this.localNom,
        telephone: `${this.countryCode} ${this.localTelephone}`
      });

      this.$emit('update:prenom', this.localPrenom);
      this.$emit('update:nom', this.localNom);
      this.$emit('update:telephone', this.localTelephone);
    }
  }
};
</script>

<template>
  <div class="info-perso">
    <p>INFORMATIONS PERSONNELLES</p>

    <div class="form">
      <div class="form-group">
        <label for="prenom">Mon prénom<span class="required">*</span></label>
        <input type="text" id="prenom" v-model="localPrenom" />
      </div>
      <div class="form-group">
        <label for="nom">Mon nom<span class="required">*</span></label>
        <input type="text" id="nom" v-model="localNom" />
      </div>
      <div class="form-group">
        <label for="telephone">Mon téléphone</label>
        <div class="telephone-input">
          <select v-model="countryCode">
            <option value="+33">+33</option>
            <!-- Ajoutez d'autres options de code pays si nécessaire -->
          </select>
          <input type="text" id="telephone" v-model="localTelephone" />
        </div>
      </div>
      <button @click="save">sauvegarder</button>
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

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.telephone-input {
  display: flex;
}

.telephone-input select {
  margin-right: 10px;
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

.required {
  color: red;
}
</style>
