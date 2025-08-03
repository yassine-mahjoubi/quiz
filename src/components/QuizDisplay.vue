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
const totalQuestions = computed(() => props.answer.quiz_questions.length)
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

const currentQuestion = computed(() => counter.value + 1)
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
    :completed-steps="currentQuestion"
    :total-steps="totalQuestions"
  />
  <p>
    {{ t('quiz.statusQuestion', { answred: questionAnswred, total: totalQuestions }) }}
  </p>

  <div ref="quizWrapper" tabindex="-1" aria-live="polite">
    <p v-if="answer">
      {{ t('quiz.questionProgress', { current: currentQuestion, total: totalQuestions }) }}
    </p>
    <quiz-question
      @answer-selected="handelAnswer"
      :question="props.answer.quiz_questions[counter]"
      :questionIndex="counter"
      :userChoice="props.userAnswers[counter]"
    />

    <nav class="grid" v-if="totalQuestions > 1">
      <button class="outline" @click="previousQuestion" :disabled="counter === 0">
        {{ t('common.previous') }}
      </button>
      <button class="outline" @click="nextQuestion" :disabled="counter >= totalQuestions - 1">
        {{ t('common.next') }}
      </button>
    </nav>
    <hr />
    <button class="contraste" @click="handelSubmit" v-if="atLeastAnswred">
      {{ t('common.submit') }}
    </button>
  </div>
</template>
