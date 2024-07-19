import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages'; // Correction ici

// Importer le composant de la page de forum
import ForumDetails from '@/pages/ForumDetails.vue';
import PorfilVisit from '@/pages/PorfilVisit.vue'
import Test from '@/pages/test.vue'

// Étendre les routes générées avec la route dynamique
const additionalRoutes = [
  {
    path: '/forum/:id',
    name: 'ForumDetails',
    component: ForumDetails,
  },
  {
    path: '/test/:id',
    name: 'test',
    component: Test,
  },
  {
    path: '/annuaire/:id',
    name: 'ProfilVisit',
    component: PorfilVisit,
  }
];

// Fusionner les routes générées automatiquement et les routes supplémentaires
const routes = setupLayouts([...generatedRoutes, ...additionalRoutes]);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
