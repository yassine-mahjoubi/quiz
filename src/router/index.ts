import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '@/components/Views/AboutView.vue'
import ApiView from '@/components/Views/ApiView.vue'
import QuizHome from '@/components/Views/QuizView.vue'

const routes = [
  { path: '/', component: QuizHome },
  { path: '/api', component: ApiView },
  { path: '/about', component: AboutView },
  //  { path: '/:slug', name: 'bias-detail', component: BiasDetail, props: true },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
