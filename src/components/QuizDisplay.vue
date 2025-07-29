<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import QuizQuestion from './QuizQuestion.vue'
import type { quizResponse } from '../type/Type'
import { ref } from 'vue'

const { t } = useI18n()

const props = defineProps<{ answer: quizResponse; userAnswers: number[] }>()

const quizWrapper = ref<HTMLDivElement | null>(null)
const counter = ref<number>(0)
const setFocus = () => {
  quizWrapper.value?.focus()
}

defineExpose({
  setFocus,
})

const nextQuestion = () => {
  counter.value++
}
const previousQuestion = () => {
  counter.value--
}
</script>

<template>
  <div ref="quizWrapper" tabindex="-1" aria-live="polite">
    <small>nombre de question : {{ props.answer.quiz_questions.length }}</small>
    <quiz-question
      :question="props.answer.quiz_questions[counter]"
      :questionIndex="counter"
      :userChoice="userAnswers[counter]"
    />
    <div class="grid" v-if="props.answer.quiz_questions.length > 1">
      <button @click="previousQuestion" :disabled="counter === 0">
        {{ t('common.previous') }}
      </button>
      <button @click="nextQuestion" :disabled="counter >= props.answer.quiz_questions.length - 1">
        {{ t('common.next') }}
      </button>
    </div>
  </div>
</template>
