<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import QuizQuestion from './QuizQuestion.vue'
import type { quizResponse } from '../type/Type'
import { ref } from 'vue'

const { t } = useI18n()

const props = defineProps<{ answer: quizResponse; userAnswers: (number | null)[] }>()
const emit = defineEmits<{
  'answer-selected': [indexQuestion: number, indexUserNewChoice: number]
}>()

const quizWrapper = ref<HTMLDivElement | null>(null)
const counter = ref<number>(0)
const setFocus = () => {
  quizWrapper.value?.focus()
}

defineExpose({
  setFocus,
})

//const userAnswers = ref<(number | null)[]>(Array(props.userAnswers.length).fill(null))
//const numberOfQuestions = props.answer.quiz_questions.length
//const currentUserAnswers = ref<(number | null)[]>(new Array(numberOfQuestions).fill(null))
const nextQuestion = () => {
  counter.value++
}
/* const quizResult = computed(() => {
  return props.answer.quiz_questions.map((question, index) => {
    const Qquestion = question.question_text
    const userAnswer = currentUserAnswers.value[index]
    const QcorrectAnswer = question.correct_answer_index
    return {
      the_question: Qquestion,
      the_user_answer: userAnswer,
      the_correct_answer: QcorrectAnswer,
      the_status: userAnswer == QcorrectAnswer,
    }
  })
}) */

const previousQuestion = () => {
  counter.value--
}

const handelAnswer = (questionIndex: number, answerIndex: number) => {
  //currentUserAnswers.value[questionIndex] = answerIndex
  emit('answer-selected', questionIndex, answerIndex)
}

//to do fix focus when click next or previous button
</script>

<template>
  <div ref="quizWrapper" tabindex="-1" aria-live="polite">
    <quiz-question
      @answer-selected="handelAnswer"
      :question="props.answer.quiz_questions[counter]"
      :questionIndex="counter"
      :userChoice="props.userAnswers[counter]"
    />
    <small> la réponse totale est : {{ userAnswers }}</small>
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
