<script lang="ts" setup>
import { defineProps } from 'vue'
import slugify from 'slugify'

import type { Question } from '../type/Type'

const props = defineProps<{
  question: Question
  questionIndex: number
  userChoice: number
}>()

const emits = defineEmits<{
  'answer-selected': [indexQuestion: number, indexUserNewChoice: number]
}>()

const onSelectChoice = (choiceIdex: number) => {
  emits('answer-selected', props.questionIndex, choiceIdex)
  console.log("J'ai cliqué sur le choix:", choiceIdex)
}
</script>

<template>
  <pre>{{ props.question }}</pre>
  <legend>{{ props.question.question_text }}</legend>

  <template v-for="(choice, choiceIdex) in props.question.choices" :key="choice">
    <label :for="`q-${props.questionIndex}-${slugify(choice)}`">
      <input
        type="radio"
        :value="choiceIdex"
        :id="`q-${props.questionIndex}-${slugify(choice)}`"
        :name="`question-${props.questionIndex}`"
        :checked="choiceIdex === props.userChoice"
        @change="() => onSelectChoice(choiceIdex)"
      />{{ choice }}
    </label>
  </template>

  <p>Correct Answer: {{ question.correct_answer_index }}</p>
</template>

<style lang="scss" scoped></style>
