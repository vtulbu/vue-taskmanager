import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/boards'
    },
    {
      path: '/boards',
      name: 'Boards',
      component: () => import('../../src/App.vue')
    }
  ]
})

export default router
