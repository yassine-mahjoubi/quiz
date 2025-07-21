<script lang="ts" setup>
import { defineProps } from 'vue'
import Question from './Question.vue'
import type { quizResponse } from '../type/Type'
const props = defineProps<{ answer: quizResponse; userAnswers: number[] }>()

console.log('propos from app.vue: ', props.answer)
</script>

<template>
  <Question
    v-for="(singleQuestion, singleIndex) in props.answer.quiz_questions"
    :key="singleIndex"
    :question="singleQuestion"
    :questionIndex="singleIndex"
    :userChoice="userAnswers[singleIndex]"
  />
</template>

<style lang="scss" scoped></style>
