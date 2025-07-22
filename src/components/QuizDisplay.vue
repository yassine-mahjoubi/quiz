<script lang="ts" setup>
import Question from './Question.vue'
import type { quizResponse } from '../type/Type'
import { ref } from 'vue'

const props = defineProps<{ answer: quizResponse; userAnswers: number[] }>()

const quizWrapper = ref<HTMLDivElement | null>(null)
const setFocus = () => {
  quizWrapper.value?.focus()
}

defineExpose({
  setFocus,
})
</script>

<template>
  <div ref="quizWrapper" tabindex="-1" aria-live="polite">
    <Question
      v-for="(singleQuestion, singleIndex) in props.answer.quiz_questions"
      :key="singleIndex"
      :question="singleQuestion"
      :questionIndex="singleIndex"
      :userChoice="userAnswers[singleIndex]"
    />
  </div>
</template>
