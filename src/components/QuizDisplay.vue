<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import QuizQuestion from './QuizQuestion.vue'
import ProgressBar from './ProgressBar.vue'
import type { quizResponse } from '../type/Type'
import { computed, ref } from 'vue'

const props = defineProps<{ answer: quizResponse; userAnswers: (number | null)[] }>()
const emit = defineEmits<{
  'answer-selected': [indexQuestion: number, indexUserNewChoice: number]
  'answer-submit': [isCompleted: boolean]
}>()

const quizWrapper = ref<HTMLDivElement | null>(null)
const counter = ref<number>(0)
const isCompleted = ref<boolean>(false)
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
const atLeastAnswred = computed(() => {
  return props.userAnswers.some((value) => value !== null)
})
const questionAnswred = computed(() => {
  return props.userAnswers
    .map((answer) => {
      return answer !== null
    })
    .filter((tr) => tr === true).length
})

const handelSubmit = () => {
  emit('answer-submit', isCompleted.value)
}

const handelAnswer = (questionIndex: number, answerIndex: number) => {
  emit('answer-selected', questionIndex, answerIndex)
}

//to do fix focus when click next or previous button
</script>

<template>
  <progress-bar
    :progress-type="true"
    :completed-steps="questionAnswred"
    :total-steps="answer.quiz_questions.length"
  />

  <div ref="quizWrapper" tabindex="-1" aria-live="polite">
    <p v-if="answer">
      question(s) answred: {{ questionAnswred }} sur {{ answer.quiz_questions.length }}
    </p>
    <quiz-question
      @answer-selected="handelAnswer"
      :question="props.answer.quiz_questions[counter]"
      :questionIndex="counter"
      :userChoice="props.userAnswers[counter]"
    />

    <div class="grid" v-if="props.answer.quiz_questions.length > 1">
      <button class="outline" @click="previousQuestion" :disabled="counter === 0">
        {{ t('common.previous') }}
      </button>
      <button
        class="outline"
        @click="nextQuestion"
        :disabled="counter >= props.answer.quiz_questions.length - 1"
      >
        {{ t('common.next') }}
      </button>
    </div>
    <hr />
    <button class="contraste" @click="handelSubmit" v-if="atLeastAnswred">
      {{ t('common.submit') }}
    </button>
  </div>
</template>
