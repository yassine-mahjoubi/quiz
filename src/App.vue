<script setup lang="ts">
import { ref } from 'vue'
import { generateQuiz } from './scripts/service'
import type { quizResponse } from './type/Type'

import QuizDisplay from './components/QuizDisplay.vue'
import QuizForm from './components/QuizForm.vue'
import ProgressBar from './components/ProgressBar.vue'

const msg = ref<string>('générateur de quiz')
const answer = ref<quizResponse>({ quiz_questions: [] })
const loading = ref<boolean>(false)
const hasBeenTouched = ref<boolean>(false)
const blocAnswer = ref<HTMLDivElement | null>(null)
const userAnswers = ref<number[]>([])
const showUserAnswers = ref<boolean[]>([])
const isInvalidAnswer = ref<(boolean | undefined)[]>([])
const totalQuestion = ref<number>(0)
const quizWrapper = ref<InstanceType<typeof QuizDisplay> | null>(null)

const handleGenerateQuiz = async (quizData: {
  question: string
  difficulty: 'Facile' | 'Moyen' | 'Difficile'
}) => {
  loading.value = true

  try {
    const response = await generateQuiz(quizData.question, quizData.difficulty)
    answer.value = <quizResponse>JSON.parse(response)
    msg.value = 'Quiz generated successfully sur: ' + quizData.question
    showUserAnswers.value = answer.value.quiz_questions.map(() => false)
    isInvalidAnswer.value = answer.value.quiz_questions.map(() => undefined)
    userAnswers.value = answer.value.quiz_questions.map(() => -1)
    hasBeenTouched.value = false
    totalQuestion.value = answer.value.quiz_questions.length
    //blocAnswer.value?.focus()
    if (quizWrapper.value) {
      quizWrapper.value?.setFocus()
    }
  } catch (error) {
    console.error('Error generating quiz:', error)
    msg.value = 'An error occurred while generating the quiz.'
  } finally {
    loading.value = false
  }
}

const validateAnswer = (index: number) => {
  showUserAnswers.value[index] = true

  if (userAnswers.value[index] === answer.value.quiz_questions[index].correct_answer_index) {
    console.log('reponse juste')
    isInvalidAnswer.value[index] = false
  } else {
    isInvalidAnswer.value[index] = true
  }
}
</script>

<template>
  <main class="container" role="main">
    <h1>{{ msg }}</h1>
    <progress-bar v-if="loading" :progress-type="false" />
    <quiz-display :answer="answer" :userAnswers="userAnswers" ref="quizWrapper" />
    <quiz-form @user-question="handleGenerateQuiz" :loading="loading" />
    <p v-if="answer">nombre de question {{ totalQuestion }}</p>
    <!--     <pre class="container"><code>{{ answer }}</code></pre>
 -->
  </main>
</template>

<style scoped>
.bloc {
  max-width: max-content;
}
</style>
