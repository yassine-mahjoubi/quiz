<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, shallowRef, watch, provide, nextTick } from 'vue'

import { generateQuiz } from './scripts/service'
import { getDuration } from './utils/timeduration'

import type { quizResponse, difficulty, numberQuestions } from './type/Type'

import HeaderLayout from './components/Layout/HeaderLayout.vue'
import HeroLayout from './components/Layout/HeroLayout.vue'
import QuizDisplay from './components/QuizDisplay.vue'
import QuizForm from './components/QuizForm.vue'
import QuizResult from './components/QuizResult.vue'
import ProgressBar from './components/ProgressBar.vue'

const { t, locale } = useI18n()
const answer = shallowRef<quizResponse | null>(null)
const loading = ref<boolean>(false)
const userAnswers = ref<(number | null)[]>([])
const showUserAnswers = ref<boolean[]>([])
const isInvalidAnswer = ref<(boolean | undefined)[]>([])
const totalQuestion = ref<number>(0)
const quizWrapper = ref<InstanceType<typeof QuizDisplay> | null>(null)
const showReaderScreen = ref<boolean>(false)
const showResultQuiz = ref<boolean>(false)
const showQuizForm = ref<boolean>(true)
const showQuizDisplay = ref<boolean>(false)
const contexte = ref<string | null>(null)
const quizTimeDuration = ref<number>(0)
const infosQuiz = ref<string>('')
const showErrorMessage = ref<boolean>(false)
const errorMessageRef = ref<HTMLDivElement | null>(null)
const allowDebug = ref<boolean>(true)

provide('allowDebug', allowDebug.value)

const handleGenerateQuiz = async (payload: {
  question: string
  difficulty: difficulty
  numberQuestions: numberQuestions
  url: string
  contextEnabled: boolean
}) => {
  loading.value = true
  const quizDurationGeneration = Date.now()
  let messageKey = ''
  try {
    const {
      text,
      context,
      messageKey: serviceMessageKey,
    } = await generateQuiz(
      payload.question,
      payload.difficulty,
      payload.numberQuestions,
      locale.value,
      payload.url,
      payload.contextEnabled,
    )
    messageKey = serviceMessageKey
    contexte.value = context
    if (!text) {
      throw new Error('contenu retourné invalide')
    }

    answer.value = <quizResponse>JSON.parse(text)
    console.warn('Quiz generated successfully sur: ', payload.question)
    showUserAnswers.value = answer.value.quiz_questions.map(() => false)
    isInvalidAnswer.value = answer.value.quiz_questions.map(() => undefined)
    userAnswers.value = answer.value.quiz_questions.map(() => null)
    totalQuestion.value = answer.value.quiz_questions.length
    showQuizForm.value = false
    showQuizDisplay.value = true
    showErrorMessage.value = false
    infosQuiz.value = messageKey
    if (quizWrapper.value) {
      quizWrapper.value?.setFocus()
    }
  } catch (error) {
    console.error('Error generating quiz:', error)
    infosQuiz.value = messageKey
    showErrorMessage.value = true
  } finally {
    loading.value = false
    quizTimeDuration.value = getDuration(quizDurationGeneration)
  }
}

watch(locale, () => {
  document.title = t('seo.title')
})

watch(
  showErrorMessage,
  () => {
    nextTick(() => errorMessageRef.value?.focus())
  },
  { flush: 'post' },
)

const handelUpdateScreen = (): void => {
  showReaderScreen.value = true
}

const handleAnswerSubmit = (): void => {
  showResultQuiz.value = true
  showQuizDisplay.value = false
}

const handleAnswerSelected = (indexQuestion: number, indexUserNewChoice: number) => {
  userAnswers.value[indexQuestion] = indexUserNewChoice
}

const handleNewQuiz = () => {
  showQuizForm.value = true
  showResultQuiz.value = false
  infosQuiz.value = ''
}
</script>
<template>
  <progress-bar v-if="loading" :progress-type="false" />
  <header-layout @language-changed="handelUpdateScreen" />
  <main class="container" role="main">
    <p v-if="showReaderScreen" aria-live="polite" aria-atomic="true" class="visually-hidden">
      {{ t('common.language_changed_announcement') }}
    </p>
    <section v-if="!infosQuiz">
      <hero-layout />
    </section>
    <section v-if="showErrorMessage" ref="errorMessageRef" role="alert" tabindex="-1">
      <p class="error">
        {{ t(infosQuiz) }}
      </p>
    </section>

    <section v-if="answer && showResultQuiz">
      <quiz-result :answer="answer" :userAnswers="userAnswers" @new-quiz="handleNewQuiz" />
    </section>
    <section v-if="answer && showQuizDisplay">
      <quiz-display
        :answer="answer"
        :userAnswers="userAnswers"
        :duration="quizTimeDuration"
        :infosQuiz="infosQuiz"
        @answer-selected="handleAnswerSelected"
        @answer-submit="handleAnswerSubmit"
        ref="quizWrapper"
      />
    </section>
    <section v-if="showQuizForm">
      <quiz-form @user-question="handleGenerateQuiz" :loading="loading" />
    </section>
    <section v-if="allowDebug">
      <details name="api" v-if="answer">
        <summary role="button" class="outline secondary">
          show the API generated for the quiz
        </summary>
        <pre><code> {{ answer }}</code></pre>
      </details>
      <details name="api" v-if="contexte">
        <summary role="button" class="outline secondary">markdown generated from</summary>
        <pre><code> {{ contexte }}</code></pre>
      </details>
    </section>
  </main>
</template>
