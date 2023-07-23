import { createRouter, createWebHistory } from 'vue-router'
import MyLogin from '../views/MyLogin.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: MyLogin
    },
  ]
})

export default router
