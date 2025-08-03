<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { ref, computed } from 'vue'
const { t } = useI18n()

const difficulty = ref<'Facile' | 'Moyen' | 'Difficile'>('Facile')
const numberQuestions = ref<5 | 10 | 15>(5)
const yourQuestion = ref<string>('')
const yourQuestion_input = ref<HTMLInputElement | null>(null)
const hasBeenTouched = ref<boolean>(false)

const emit = defineEmits<{
  'user-question': [
    {
      question: string
      difficulty: 'Facile' | 'Moyen' | 'Difficile'
      numberQuestions: 5 | 10 | 15
    },
  ]
}>()

const props = defineProps<{ loading: boolean }>()
const handleTextButton = computed(() => {
  return props.loading ? t('common.loading') : t('quizForm.generateButton')
})
const isInvalid = computed(() => {
  if (!hasBeenTouched.value) return undefined
  return !yourQuestion.value.trim()
})
const handleInput = () => {
  hasBeenTouched.value = true
  if (isInvalid.value) {
    yourQuestion_input.value?.focus()
    return
  } else {
    emit('user-question', {
      question: yourQuestion.value,
      difficulty: difficulty.value,
      numberQuestions: numberQuestions.value,
    })
  }
  yourQuestion.value = ''
  hasBeenTouched.value = false
}
</script>

<template>
  <fieldset :disabled="props.loading">
    <small>{{ t('quizForm.field.requiered') }}</small>
    <hr />
    <label for="youQuestion"> {{ t('quizForm.subject') }} : {{ yourQuestion }} *</label>
    <input
      type="text"
      id="youQuestion"
      ref="yourQuestion_input"
      name="youQuestion"
      v-model="yourQuestion"
      :placeholder="t('quizForm.subject') + '...'"
      :aria-invalid="isInvalid"
      @blur="hasBeenTouched = true"
      aria-labelledby="input-error"
    />
    <small v-show="isInvalid" id="input-error" aria-invalid="true">{{
      t('quizForm.field.error')
    }}</small>
  </fieldset>
  <div class="grid">
    <fieldset :disabled="props.loading">
      <label for="numberQuestions">{{ t('quizForm.numQuestionsLabel') }}</label>
      <select id="numberQuestions" name="numberQuestions" v-model="numberQuestions">
        <option value="5" default>5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </fieldset>
    <fieldset :disabled="props.loading">
      <label for="difficuty">{{ t('quizForm.difficultyLabel') }}</label>
      <select id="difficuty" name="difficuty" v-model="difficulty">
        <option value="Facile" default>{{ t('quizForm.difficulty.easy') }}</option>
        <option value="Moyen">{{ t('quizForm.difficulty.medium') }}</option>
        <option value="Difficile">{{ t('quizForm.difficulty.hard') }}</option>
      </select>
    </fieldset>
  </div>

  <button @click="handleInput" :disabled="isInvalid || props.loading" :aria-busy="props.loading">
    {{ handleTextButton }}
  </button>
</template>
