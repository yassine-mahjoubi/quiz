<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { computed } from 'vue'

const props = defineProps<{
  difficulty: string
  yourQuestion: string
  numberQuestions: number
  url: string
  isContextEnabled: boolean
}>()
const language = computed(() => (t('common.language') == 'Français' ? 'Français' : 'anglais'))

const promptWithoutContext = computed(() => {
  return `Tu es un assistant expert en création de quiz. Crée un quiz en ${language.value} avec
   ${props.numberQuestions} questions,
  niveau ${props.difficulty.toUpperCase()} sur ---${props.yourQuestion.toUpperCase()}---`
})

const promptEnabledContext = computed(() => {
  return ` Tu es un assistant expert en création de quiz.
   Analyse le contexte et la question ci-dessous.
   Contexte :
   ---
   ${props.url}
   ---
   Question de l'utilisateur : ---${props.yourQuestion.toUpperCase()}---
   Instructions :
   1. Évalue si le contexte est directement pertinent pour répondre à la question de l'utilisateur.
   2. Si le contexte n'est PAS pertinent, appelle la fonction 'generateur_de_quiz' en remplissant SEULEMENT le champ 'error' avec le message "Le contenu fourni ne
   semble pas correspondre au sujet du quiz demandé.".
   3. Si le contexte EST pertinent, utilise-le pour créer un quiz en ${language.value}
   avec ${props.numberQuestions} questions de niveau
   ${props.difficulty.toUpperCase()}. Ensuite, appelle la fonction 'generateur_de_quiz' en remplissant le champ 'quiz_questions' avec le résultat.
   `
})
</script>

<template>
  <details>
    <summary role="button" class="outline secondary">Pseudo Prompt//</summary>
    <pre><code class="small">
      {{ isContextEnabled ?  promptEnabledContext  : promptWithoutContext }}
    </code></pre>
  </details>
</template>
