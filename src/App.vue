<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'
import { generateQuiz } from './scripts/service'
import type { quizResponse } from './type/Type'
import SwitchLanguage from './components/SwitchLanguage.vue'
import QuizDisplay from './components/QuizDisplay.vue'
import QuizForm from './components/QuizForm.vue'
import ProgressBar from './components/ProgressBar.vue'

const { t, locale } = useI18n()
const answer = ref<quizResponse | null>(null)
const loading = ref<boolean>(false)
const hasBeenTouched = ref<boolean>(false)
const userAnswers = ref<number[]>([])
const showUserAnswers = ref<boolean[]>([])
const isInvalidAnswer = ref<(boolean | undefined)[]>([])
const totalQuestion = ref<number>(0)
const quizWrapper = ref<InstanceType<typeof QuizDisplay> | null>(null)
const showReaderScreen = ref<boolean>(false)

const handleGenerateQuiz = async (payload: {
  question: string
  difficulty: 'Facile' | 'Moyen' | 'Difficile'
}) => {
  loading.value = true

  try {
    const response = await generateQuiz(payload.question, payload.difficulty)
    answer.value = <quizResponse>JSON.parse(response)
    console.log('answer.value', answer.value)
    console.warn('Quiz generated successfully sur: ', payload.question)
    showUserAnswers.value = answer.value.quiz_questions.map(() => false)
    isInvalidAnswer.value = answer.value.quiz_questions.map(() => undefined)
    userAnswers.value = answer.value.quiz_questions.map(() => -1)
    hasBeenTouched.value = false
    totalQuestion.value = answer.value.quiz_questions.length
    if (quizWrapper.value) {
      quizWrapper.value?.setFocus()
    }
  } catch (error) {
    console.error('Error generating quiz:', error)
  } finally {
    loading.value = false
  }
}

/* onst validateAnswer = (index: number) => {
  showUserAnswers.value[index] = true

  if (userAnswers.value[index] === answer.value.quiz_questions[index].correct_answer_index) {
    console.log('reponse juste')
    isInvalidAnswer.value[index] = false
  } else {
    isInvalidAnswer.value[index] = true
  }
} */

watch(locale, () => {
  document.title = t('seo.title')
})

const handelUpdateScreen = (): void => {
  showReaderScreen.value = true
}
</script>

<template>
  <progress-bar v-if="loading" :progress-type="false" />

  <header class="container">
    <nav>
      <ul>
        <li>
          <h1>{{ t('quizForm.title') }}</h1>
        </li>
      </ul>
      <ul>
        <li><switch-language @language-changed="handelUpdateScreen" /></li>
      </ul>
    </nav>
  </header>
  <main class="container" role="main">
    <p v-if="showReaderScreen" aria-live="polite" aria-atomic="true" class="visually-hidden">
      {{ t('common.language_changed_announcement') }}
    </p>
    <section>
      <quiz-display v-if="answer" :answer="answer" :userAnswers="userAnswers" ref="quizWrapper" />
    </section>
    <section>
      <quiz-form @user-question="handleGenerateQuiz" :loading="loading" />
    </section>
    <hr />
    <section>
      <details name="api" v-if="answer">
        <summary role="button" class="outline secondary">
          show the API generated for the quiz
        </summary>
        <pre><code> {{ answer }}</code></pre>
      </details>
    </section>
  </main>
</template>

<style scoped>
.bloc {
  max-width: max-content;
}
</style>
