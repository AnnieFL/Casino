import { createRouter, createWebHistory } from 'vue-router'
import Slots from '../views/Slots.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'slots',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Slots
    }
  ]
})

export default router
