import { createRouter, createWebHistory } from 'vue-router';
import unComponente from '@/components/unComponente.vue';
import vistaComponentesVue from '@/components/vistaComponentes.vue';

const routes = [
  {
    path: '/elemento/:id',
    name: 'elemento',
    component: unComponente,
    props: (route) => ({ id: route.params.id, ejecutorId: route.query.ejecutorId }),
  },
  {
    path: '/elemento/:id',
    name: 'elemento',
    component: unComponente,
    props: (route) => ({ id: route.params.id, sensorId: route.query.sensorId }), 
  },
  {
    path: '/',
    name: 'home',
    component: vistaComponentesVue
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;