import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', () => {
  const newQuiz = ref<boolean>(false)
  return { newQuiz }
})
