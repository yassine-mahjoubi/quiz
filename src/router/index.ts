import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '@/components/Views/AboutView.vue'
import GalleryQuizesView from '@/components/Views/GalleryQuizesView.vue'
import QuizHome from '@/components/Views/QuizView.vue'

const routes = [
  { path: '/', component: QuizHome },
  { path: '/gallery-quiz', component: GalleryQuizesView },
  { path: '/about', component: AboutView },
  //  { path: '/:slug', name: 'quiz-detail', component: QuizDetail, props: true },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
