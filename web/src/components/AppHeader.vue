<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';
import AppHeaderLinks from "@/components/AppHeaderLinks.vue";
import { useRouter } from 'vue-router';

// Utiliser le store Pinia
const appStore = useAppStore();
const router = useRouter();

// Définir un état réactif pour suivre le bouton actuellement sélectionné
const selectedButton = ref('');

// Fonction pour mettre à jour l'état lorsque vous cliquez sur un bouton
const selectButton = (button) => {
  selectedButton.value = button;
};

// Fonction pour gérer la déconnexion
const handleLogout = () => {
  appStore.setLogout();
  selectButton('deconnexion');
  router.push('/');
};
</script>

<template>
  <AppHeaderLinks class="ma-0 w-100"/>
  <v-app-bar class="app-bar" height="75" elevation="1">
    <v-app-bar-title class="app-title" style="margin-left: 30px">
      <v-img
        :width="175"
        :height="60.72"
        src="../assets/Lorraine INP ENSTIB (couleur, CMJN).png"
      />
    </v-app-bar-title>

    <div class="spacer"></div>

    <div class="app-routes">
      <v-btn text="Accueil" to="/"
             :style="{
           borderRadius: '0px',
           color: 'primary',
           textDecoration: selectedButton === 'accueil' ? 'underline' : 'none',
           textDecorationColor: selectedButton === 'accueil' ? 'red' : 'transparent',
           textDecorationThickness: selectedButton === 'accueil' ? '3px' : 'initial',
           textUnderlineOffset: selectedButton === 'accueil' ? '5px' : 'initial'
         }"
             @click="() => selectButton('accueil')" />
      <v-btn text="Forum" to="/forum"
             :style="{
           borderRadius: '0px',
           color: 'primary',
           textDecoration: selectedButton === 'forum' ? 'underline' : 'none',
           textDecorationColor: selectedButton === 'forum' ? 'red' : 'transparent',
           textDecorationThickness: selectedButton === 'forum' ? '3px' : 'initial',
           textUnderlineOffset: selectedButton === 'forum' ? '5px' : 'initial'
         }"
             @click="() => selectButton('forum')" />
      <v-btn v-if="appStore.isUserType('intervenant') || appStore.isUserType('admin')"
             text="Mon Stand"
             :to="`/forum/${appStore.companyId}`"
             :style="{
           borderRadius: '0px',
           color: 'primary',
           textDecoration: selectedButton === 'mon-stand' ? 'underline' : 'none',
           textDecorationColor: selectedButton === 'mon-stand' ? 'red' : 'transparent',
           textDecorationThickness: selectedButton === 'mon-stand' ? '3px' : 'initial',
           textUnderlineOffset: selectedButton === 'mon-stand' ? '5px' : 'initial'
         }"
             @click="() => selectButton('mon-stand')" />
      <v-btn v-if="appStore.isUserType('intervenant')" text="Agenda" to="/agenda"
             :style="{
           borderRadius: '0px',
           color: 'primary',
           textDecoration: selectedButton === 'agenda' ? 'underline' : 'none',
           textDecorationColor: selectedButton === 'agenda' ? 'red' : 'transparent',
           textDecorationThickness: selectedButton === 'agenda' ? '3px' : 'initial',
           textUnderlineOffset: selectedButton === 'agenda' ? '5px' : 'initial'
         }"
             @click="() => selectButton('agenda')" />
      <v-btn text="Annuaire" to="/annuaire"
             :style="{
           borderRadius: '0px',
           color: 'primary',
           textDecoration: selectedButton === 'annuaire' ? 'underline' : 'none',
           textDecorationColor: selectedButton === 'annuaire' ? 'red' : 'transparent',
           textDecorationThickness: selectedButton === 'annuaire' ? '3px' : 'initial',
           textUnderlineOffset: selectedButton === 'annuaire' ? '5px' : 'initial'
         }"
             @click="() => selectButton('annuaire')" />
      <v-btn v-if="appStore.isUserType('admin')" text="Espace admin" to="/admin"
             :style="{
           borderRadius: '0px',
           color: 'primary',
           textDecoration: selectedButton === 'espace-admin' ? 'underline' : 'none',
           textDecorationColor: selectedButton === 'espace-admin' ? 'red' : 'transparent',
           textDecorationThickness: selectedButton === 'espace-admin' ? '3px' : 'initial',
           textUnderlineOffset: selectedButton === 'espace-admin' ? '5px' : 'initial'
         }"
             @click="() => selectButton('espace-admin')" />
      <v-btn v-if="!appStore.isLoggedIn" text="Connexion" to="/login" append-icon="mdi-login" class="btn-header"
             :style="{
           borderRadius: '0px',
           color: 'primary',
           textDecoration: selectedButton === 'connexion' ? 'underline' : 'none',
           textDecorationColor: selectedButton === 'connexion' ? 'red' : 'transparent',
           textDecorationThickness: selectedButton === 'connexion' ? '3px' : 'initial',
           textUnderlineOffset: selectedButton === 'connexion' ? '5px' : 'initial'
         }"
             @click="() => selectButton('connexion')" />
      <v-btn v-if="appStore.isLoggedIn" text="Déconnexion" append-icon="mdi-logout"
             :style="{
           borderRadius: '0px',
           color: 'primary',
           textDecoration: selectedButton === 'deconnexion' ? 'underline' : 'none',
           textDecorationColor: selectedButton === 'deconnexion' ? 'red' : 'transparent',
           textDecorationThickness: selectedButton === 'deconnexion' ? '3px' : 'initial',
           textUnderlineOffset: selectedButton === 'deconnexion' ? '5px' : 'initial'
         }"
             @click="handleLogout" />
    </div>

    <div class="spacer"></div>

    <div class="app-actions">
      <v-btn
        icon="mdi-magnify"
        :style="{
          fontSize: '21px',
          backgroundColor: selectedButton === 'search' ? '#FF3A4B' : 'white',
          color: selectedButton === 'search' ? 'white' : '#000',
          height: '75px',
          width: '75px',
          borderRadius: '0'
        }"
        @click="() => selectButton('search')"
      ></v-btn>
      <v-btn
        icon="mdi-account-circle"
        :style="{
          fontSize: '21px',
          backgroundColor: selectedButton === 'profil' ? '#FF3A4B' : 'white',
          color: selectedButton === 'profil' ? 'white' : '#000',
          height: '75px',
          width: '75px',
          borderRadius: '0'
        }"
        to="/profil"
        @click="() => selectButton('profil')"
      ></v-btn>
    </div>
  </v-app-bar>
</template>

<style scoped>
.app-bar {
  margin-top: 37px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-title {
  flex: 0 1 auto;
}

.app-routes {
  display: flex;
  gap: 20px; /* Ajustez cet espace selon vos besoins */
}

.app-actions {
  display: flex;
  gap: 0px; /* Ajustez cet espace selon vos besoins */
  height: 75px;
  align-items: center;
}

.spacer {
  flex: 1;
}
</style>
