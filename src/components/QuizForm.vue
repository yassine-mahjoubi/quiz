<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, computed, watch } from 'vue'
import type { numberQuestions, difficulty } from '@/type/Type'
import { useRequiredField } from '@/composables/useRequiredField'
import { useUrlField } from '@/composables/useUrlField'

const { t } = useI18n()
const difficulty = ref<difficulty>('Facile')
const numberQuestions = ref<numberQuestions>(5)
const enableContext = ref<boolean>(false)

const {
  value: yourQuestion,
  isInvalid: isInvalidQuestion,
  validate: handleInputQuestion,
  markAsTouched,
} = useRequiredField('yourQuestion_input')

const {
  Inputvalue: url,
  markAsTouched: markAsTouchedUrl,
  isInvalid: isInvalidUrl,
  validate: handleInputUrl,
} = useUrlField('url_input', enableContext)

const props = defineProps<{ loading: boolean }>()
const emit = defineEmits<{
  'user-question': [
    {
      question: string
      difficulty: difficulty
      numberQuestions: numberQuestions
      contextEnabled: boolean
      url: string
    },
  ]
}>()

//reset field url when enableContexte change
watch(enableContext, () => {
  url.value = ''
})

watch(markAsTouchedUrl, () => {
  console.log(markAsTouchedUrl)
})

const submitForm = (): void => {
  if (!handleInputUrl()) return

  if (!handleInputQuestion()) return

  emit('user-question', {
    question: yourQuestion.value,
    difficulty: difficulty.value,
    numberQuestions: numberQuestions.value,
    contextEnabled: enableContext.value,
    url: url.value,
  })
}

const handleTextButton = computed(() => {
  return props.loading ? t('common.loading') : t('quizForm.generateButton')
})
</script>

<template>
  <section class="right">
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
  </section>
  <section>
    <small>{{ t('quizForm.field.requiered') }}</small>
  </section>
  <section>
    <fieldset :disabled="props.loading">
      <label for="urlInput">{{ t('quizForm.url') }} *</label>
      <input
        type="url"
        v-model="url"
        name="urlInput"
        id="urlInput"
        ref="url_input"
        @blur="markAsTouchedUrl"
        :disabled="!enableContext"
        :aria-invalid="isInvalidUrl"
        aria-labelledby="url-info"
      />
      <small id="url-info"> {{ t('quizForm.field.urlInfo') }}: http://exemple.com</small>
      <label for="youQuestion"> {{ t('quizForm.subject') }} *: {{ yourQuestion }} </label>
      <input
        type="text"
        id="youQuestion"
        ref="yourQuestion_input"
        name="youQuestion"
        v-model="yourQuestion"
        :placeholder="t('quizForm.subject') + '...'"
        :aria-invalid="isInvalidQuestion"
        @blur="markAsTouched()"
        aria-labelledby="input-error"
      />
      <small v-show="isInvalidQuestion" id="input-error" aria-invalid="true">{{
        t('quizForm.field.error')
      }}</small>
    </fieldset>
  </section>
  <section>
    <div class="grid">
      <fieldset :disabled="props.loading">
        <label for="numberQuestions">{{ t('quizForm.numQuestionsLabel') }}</label>
        <select id="numberQuestions" name="numberQuestions" v-model.number="numberQuestions">
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
  </section>

  <button @click="submitForm" :disabled="props.loading" :aria-busy="props.loading">
    {{ handleTextButton }}
  </button>
</template>

<style scoped>
.right {
  float: right;
}
</style>
