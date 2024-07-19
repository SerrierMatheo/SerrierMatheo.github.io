/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Définition du thème personnalisé
const myCustomTheme = {
  dark: false, // ou true si vous voulez un thème sombre
  colors: {
    background: '#FFFFFF', // Couleur de fond
    surface: '#FFFFFF', // Couleur de la surface
    primary: '#2A2E46', // Couleur principale
    secondary: '#E1081A', // Couleur secondaire
    error: '#B00020', // Couleur d'erreur
    info: '#2196F3', // Couleur d'information
    success: '#4CAF50', // Couleur de succès
    warning: '#FB8C00', // Couleur d'avertissement
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme', // Utiliser le thème personnalisé par défaut
    themes: {
      myCustomTheme, // Déclaration du thème personnalisé
    },
  },
  icons: {
    defaultSet: 'mdi', // Utiliser l'icône set Material Design Icons
    aliases,
    sets: {
      mdi,
    },
  },
})
