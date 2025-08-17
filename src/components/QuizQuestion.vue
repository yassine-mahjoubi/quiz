<script lang="ts" setup>
import type { Question } from '../type/Type'
import { ref, inject } from 'vue'

// delete space and accent to create a clean id
import slugify from 'slugify'

const props = defineProps<{
  question: Question
  questionIndex: number
  userChoice: number | null
}>()

const isInvalid = ref<boolean | undefined>(undefined)
const emit = defineEmits<{
  'answer-selected': [indexQuestion: number, indexUserNewChoice: number]
}>()

const onSelectChoice = (answerIndex: number) => {
  emit('answer-selected', props.questionIndex, answerIndex)
}
const allowDebug = inject('allowDebug')
</script>

<template>
  <fieldset>
    <legend>{{ props.question.question_text }}</legend>
    <template v-for="(choice, answerIndex) in props.question.choices" :key="choice">
      <label :for="`q-${props.questionIndex}-${slugify(choice)}`">
        <input
          type="radio"
          :value="answerIndex"
          :id="`q-${props.questionIndex}-${slugify(choice)}`"
          :name="`question-${props.questionIndex}`"
          :checked="answerIndex === props.userChoice"
          @change="() => onSelectChoice(answerIndex)"
          :aria-invalid="isInvalid"
        />{{ choice }}
      </label>
    </template>
  </fieldset>

  <small v-if="allowDebug">Correct Answer: {{ question.correct_answer_index }}</small>
</template>
