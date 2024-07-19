// Utilities
import { defineStore } from 'pinia'

// store Pinia pour l'application
export const useAppStore = defineStore('app', {
  state: () => ({
    // État initial pour stocker le type d'utilisateur
    userId: null,
    userType: null,  // peut être 'intervenant', 'participant' ou 'admin'
    isLoggedIn: false,
    companyId: null,
  }),

  // Définir des actions pour mettre à jour l'état
  actions: {
    setUserId(id) {
      this.userId = id;
    },

    // Action pour définir le type d'utilisateur
    setUserType(type) {
      this.userType = type;
    },

    // Action pour vérifier le type d'utilisateur
    isUserType(type) {
      return this.userType === type;
    },

    setLogin(status) {
      this.isLoggedIn = status;
    },

    setLogout() {
      this.userId = null;
      this.userType = null;
      this.isLoggedIn = false;
      this.companyId = null;
    },

    isUserLoggedIn(isLoggedIn) {
      return this.isLoggedIn === isLoggedIn;
    },

    setCompanyId(id) {
      this.companyId = id;
    }
  },

  // Définir des getters pour accéder à l'état de manière plus lisible
  getters: {
    isIntervenant: (state) => state.userType === 'intervenant',
    isParticipant: (state) => state.userType === 'participant',
    isAdmin: (state) => state.userType === 'admin',
  },

  // Configuration de la persistance
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ['userId', 'userType', 'isLoggedIn', 'companyId'] }
    ]
  }
})
