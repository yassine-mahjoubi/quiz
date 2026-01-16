<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, computed, watch } from 'vue'
import type { numberQuestions, difficulty } from '@/type/Type'
import { useRequiredField } from '@/composables/useRequiredField'
import { useUrlField } from '@/composables/useUrlField'

const { t } = useI18n()
const difficulty = ref<difficulty>('Facile')
const numberQuestions = ref<numberQuestions>(5)
const modelIA = ref<string>('gemini-flash-latest')
const enableContext = ref<boolean>(false)

const GEMINI_MODELS = ['gemini-3-flash-preview', 'gemini-2.5-flash', 'gemini-flash-latest']
const promptWithoutContext = computed(() => {
  return `Tu es un assistant expert en création de quiz. Crée un quiz en ${t('common.language') == 'Français' ? 'Français' : 'anglais'} avec ${numberQuestions.value} questions,
  niveau ${difficulty.value.toUpperCase()} sur ---${yourQuestion.value.toUpperCase()}---`
})

const promptEnabledContext = computed(() => {
  return ` Tu es un assistant expert en création de quiz.
   Analyse le contexte et la question ci-dessous.
   Contexte :
   ---
   ${url.value}
   ---
   Question de l'utilisateur : ---${yourQuestion.value.toUpperCase()}---
   Instructions :
   1. Évalue si le contexte est directement pertinent pour répondre à la question de l'utilisateur.
   2. Si le contexte n'est PAS pertinent, appelle la fonction 'generateur_de_quiz' en remplissant SEULEMENT le champ 'error' avec le message "Le contenu fourni ne
   semble pas correspondre au sujet du quiz demandé.".
   3. Si le contexte EST pertinent, utilise-le pour créer un quiz en ${t('common.language') == 'Français' ? 'Français' : 'Anglais'}
   avec ${numberQuestions.value} questions de niveau
   ${difficulty.value.toUpperCase()}. Ensuite, appelle la fonction 'generateur_de_quiz' en remplissant le champ 'quiz_questions' avec le résultat.
   `
})

const {
  value: yourQuestion,
  isInvalid: isInvalidQuestion,
  validate: handleInputQuestion,
  markAsTouched,
  canSubmit: disabledBtn,
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
      modelIA: string
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

const submitForm = (): void => {
  if (!handleInputUrl()) return

  if (!handleInputQuestion()) return

  emit('user-question', {
    question: yourQuestion.value,
    difficulty: difficulty.value,
    numberQuestions: numberQuestions.value,
    modelIA: modelIA.value,
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
          aria-describedby="enable-selector-helper"
        />
        {{ t('quizForm.enableContext.label') }}
        <p id="enable-selector-helper" class="sr-only">
          {{ t('quizForm.enableContext.helper') }}
        </p>
      </label>
    </fieldset>
  </section>
  <section>
    <small>{{ t('quizForm.field.requiered') }}</small>
  </section>
  <section>
    <fieldset class="disabled-wrapper">
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
    </fieldset>
    <fieldset :disabled="props.loading">
      <label for="youQuestion"> {{ t('quizForm.subject') }} *: </label>
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
          <option value="5">5</option>
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
      <fieldset :disabled="props.loading">
        <label for="model-IA">{{ t('quizForm.modelLabel') }}</label>
        <select id="model-IA" name="model-IA" v-model="modelIA">
          <option :value="model" v-for="model in GEMINI_MODELS" :key="model">
            {{ model }}
          </option>
        </select>
      </fieldset>
    </div>
  </section>
  <section>
    <details>
      <summary role="button" class="outline secondary">Prompt</summary>
      <pre><code class="small">
      {{ enableContext ?  promptEnabledContext  : promptWithoutContext }}
    </code></pre>
    </details>
  </section>
  <section class="section-btn">
    <div class="disabled-wrapper">
      <button
        @click="submitForm"
        :disabled="props.loading || disabledBtn"
        :aria-busy="props.loading"
      >
        {{ handleTextButton }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.right {
  float: right;
}
.section-btn {
  display: flex;
  justify-content: center;
}
.disabled-wrapper:has([disabled]) {
  cursor: not-allowed;
}
</style>
