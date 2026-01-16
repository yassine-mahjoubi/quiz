<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { Icon } from '@iconify/vue'
import { useHead } from '@unhead/vue'
import { ref, shallowRef, watch, provide, nextTick, computed } from 'vue'

useHead({
  title: computed(() => t('seo.title')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('seo.description')),
    },
  ],
})

import { generateQuiz } from './scripts/service'
import { getDuration } from './utils/timeduration'

import type { quizResponse, difficulty, numberQuestions } from './type/Type'

import HeaderLayout from './components/Layout/HeaderLayout.vue'
import HeroLayout from './components/Layout/HeroLayout.vue'
import FooterLayout from './components/Layout/FooterLayout.vue'
import QuizDisplay from './components/QuizDisplay.vue'
import QuizForm from './components/QuizForm.vue'
import QuizResult from './components/QuizResult.vue'
import ProgressBar from './components/ProgressBar.vue'

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
const allowDebug = ref<boolean>(false)
const url = ref<string>('')

provide('allowDebug', allowDebug.value)

const handleGenerateQuiz = async (payload: {
  question: string
  difficulty: difficulty
  numberQuestions: numberQuestions
  modelIA: string
  url: string
  isContextEnabled: boolean
}) => {
  url.value = payload.url
  console.log(url)
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
      payload.modelIA,
      locale.value,
      payload.url,
      payload.isContextEnabled,
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
  <div class="home-wrapper-layout">
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
          <Icon
            aria-hidden="true"
            class="icon"
            icon="game-icons:alien-skull"
            width="32"
            height="32"
          />
          {{ t(infosQuiz) }}
        </p>
      </section>

      <section v-if="answer && showResultQuiz">
        <quiz-result :answer="answer" :userAnswers="userAnswers" @new-quiz="handleNewQuiz" />
      </section>
      <section v-if="answer && showQuizDisplay">
        <quiz-display
          :answer="answer"
          :contexte="contexte"
          :url="url"
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
    </main>
    <footer>
      <FooterLayout />
    </footer>
  </div>
</template>
<style lang="scss">
.home-wrapper-layout {
  padding: 0.5 1rem;
}
</style>
