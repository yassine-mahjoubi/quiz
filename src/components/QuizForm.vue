<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, computed, useTemplateRef } from 'vue'

const { t } = useI18n()
const difficulty = ref<'Facile' | 'Moyen' | 'Difficile'>('Facile')
const numberQuestions = ref<5 | 10 | 15>(5)
const yourQuestion = ref<string>('')
const url = ref<string>('')
const url_input = useTemplateRef<HTMLInputElement>('url_input')
const yourQuestion_input = useTemplateRef<HTMLInputElement>('yourQuestion_input')
const enableContext = ref<boolean>(false)
const hasBeenTouched = ref<boolean>(false)
const props = defineProps<{ loading: boolean }>()

const emit = defineEmits<{
  'user-question': [
    {
      question: string
      difficulty: 'Facile' | 'Moyen' | 'Difficile'
      numberQuestions: 5 | 10 | 15
      contextEnabled: boolean
      url: string
    },
  ]
}>()

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
      contextEnabled: enableContext.value,
      url: url.value,
    })
  }
  yourQuestion.value = ''
  hasBeenTouched.value = false
}
</script>

<template>
  <fieldset>
    <label for="enableContext">
      <input
        name="enableContext"
        type="checkbox"
        role="switch"
        id="enableContext"
        v-model="enableContext"
        aria-labelledby="enable-selector-helper"
      />
      {{ t('quizForm.enableContext.label') }}
      <p class="sr-only">
        {{ t('quizForm.enableContext.helper') }}
      </p>
    </label>
  </fieldset>
  <fieldset :disabled="props.loading">
    <small>{{ t('quizForm.field.requiered') }}</small>
    <hr />
    <label for="urlInput">{{ t('quizForm.url') }} *</label>
    <input
      type="url"
      v-model="url"
      name="urlInput"
      id="urlInput"
      ref="url_input"
      :disabled="!enableContext"
      aria-labelledby="url-info"
    />
    <small id="url-info"> exemple d'une url valide: http://exemple.com</small>
    <label for="youQuestion"> {{ t('quizForm.subject') }} *: {{ yourQuestion }} </label>
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
