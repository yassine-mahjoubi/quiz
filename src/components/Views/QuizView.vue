<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { Icon } from '@iconify/vue'
import { useHead } from '@unhead/vue'
import { ref, shallowRef, watch, provide, nextTick, computed, onMounted } from 'vue'

useHead({
  title: computed(() => t('seo.title')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('seo.description')),
    },
  ],
})

import { generateQuiz } from '../../scripts/service'
import { getDuration } from '../../utils/timeduration'

import type { quizResponse, difficulty, numberQuestions } from '../../type/Type'

import HeroLayout from '../Layout/HeroLayout.vue'
import FooterLayout from '../Layout/FooterLayout.vue'
import QuizDisplay from '../QuizDisplay.vue'
import QuizForm from '../QuizForm.vue'
import QuizResult from '../QuizResult.vue'
import ProgressBar from '../ProgressBar.vue'

const answer = shallowRef<quizResponse | null>(null)
const loading = ref<boolean>(false)
const userAnswers = ref<(number | null)[]>([])
const showUserAnswers = ref<boolean[]>([])
const isInvalidAnswer = ref<(boolean | undefined)[]>([])
const totalQuestion = ref<number>(0)
const quizWrapper = ref<InstanceType<typeof QuizDisplay> | null>(null)
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

const handleAnswerSubmit = () => {
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
  showErrorMessage.value = false
}
</script>
<template>
  <div class="home-wrapper-layout">
    <progress-bar v-if="loading" :progress-type="false" />
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
  </div>
</template>
