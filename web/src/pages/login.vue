<script>
import { useAppStore } from '@/stores/app';
const appStore = useAppStore();
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '', // Ajouter un état pour le message d'erreur
      showCgu: false, // État pour afficher le formulaire CGU
      userId: null, // ID de l'utilisateur connecté
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await this.$apiAuth.post('/api/login', {
          username: this.username,
          password: this.password,
        });
        console.log('Login successful', response.data);
        console.log(response.data.cgu);
        console.log(response.data.type);
        console.log(response.data.company_id);

        // Vérifier si les CGU sont acceptées
        if (response.data.cgu === 'non') {
          // Afficher le formulaire pour accepter les CGU
          this.showCgu = true;
          this.userId = response.data.id_user; // Stocker l'ID utilisateur
        } else {
          // Mettre à jour le store avec les informations de l'utilisateur
          appStore.setLogin(true);
          appStore.setUserId(response.data.id_user);
          appStore.setUserType(response.data.type);

          if (appStore.isAdmin || appStore.isIntervenant) {
            appStore.setCompanyId(response.data.company_id);
          }

          // Rediriger l'utilisateur en cas de succès
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Login failed', error);
        this.errorMessage = 'Username ou mot de passe incorrect';
      }
    },
    async acceptCgu() {
      try {
        const response = await this.$apiUsers.put(`/api/users/${this.userId}`, {
          cgu: "oui",
        });
        console.log('CGU accepted', response.data);

        // Rediriger vers l'accueil après acceptation des CGU
        this.$router.push('/');
      } catch (error) {
        console.error('Failed to accept CGU', error);
        this.errorMessage = 'Une erreur est survenue lors de l\'acceptation des CGU. Veuillez réessayer.';
      }
    },
  },
};
</script>

<template>
  <v-main id="main">
    <v-container id="v-container">
      <h1>Connectez-vous</h1>
      <h2>Pour accèder au forum</h2>
      <v-container color="error" v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </v-container>
      <v-container>
        <p>Mon login</p>
        <v-text-field
          class="textfield"
          variant="outlined"
          style="border-radius: 25px !important;"
          v-model="username"
        />
        <p>Mon mot de passe</p>
        <v-text-field
          class="textfield"
          variant="outlined"
          type="password"
          v-model="password"
        />
      </v-container>
      <v-container class="btn-container">
        <v-btn class="btn" @click="handleLogin" color="primary">Valider</v-btn>
      </v-container>
    </v-container>

    <!-- Dialog pour accepter les CGU -->
    <v-dialog v-model="showCgu" max-width="600px">
      <v-card>
        <v-card-title class="headline">Accepter les CGU</v-card-title>
        <v-card-text>
          <p>Veuillez accepter les Conditions Générales d'Utilisation pour continuer.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="acceptCgu">Accepter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<style scoped>
#main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 150px;
}

#v-container {
  border: solid black 1px;
  border-radius: 25px;
  margin-top: 5vh;
  margin-right: 20vw;
  margin-left: 20vw;
  display: block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  background-color: #ffffff;
}

h1 {
  color: #e2001a;
  margin-bottom: 8px;
  font-size: 35px;
  font-family: Roboto-Condensed, sans-serif;
}

h2 {
  font-size: 20px;
  font-family: Roboto-Condensed, sans-serif;
  color: #666666;
  margin-bottom: 24px;
}

p {
  font-size: 20px;
  font-family: Roboto-Condensed, sans-serif;
  font-weight: lighter;
  color: #000000;
  margin-bottom: 8px;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.btn {
  border-radius: 25px;
  padding-right: 7.5vw;
  padding-left: 7.5vw;
}

/* Use :deep to target Vuetify's deep internal styles */
:deep(.textfield .v-input__control) {
  border-radius: 25px !important;
}

:deep(.textfield .v-input__control .v-input__slot) {
  border-radius: 25px !important;
  border: 1px solid #7B7B7B !important;
  padding: 8px !important;
}

:deep(.textfield input) {
  border-radius: 25px !important;
  padding: 10px;
}

@media (max-width: 600px) {
  #v-container {
    margin-right: 5vw;
    margin-left: 5vw;
    padding: 20px;
  }

  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 18px;
  }

  p {
    font-size: 16px;
  }

  .btn {
    padding-right: 5vw;
    padding-left: 5vw;
  }
}
</style>
