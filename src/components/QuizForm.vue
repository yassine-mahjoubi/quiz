<script lang="ts" setup>
import { ref, computed } from 'vue'
const difficulty = ref<'Facile' | 'Moyen' | 'Difficile'>('Facile')
const yourQuestion = ref<string>('')
const yourQuestion_input = ref<HTMLInputElement | null>(null)
const hasBeenTouched = ref<boolean>(false)

const emit = defineEmits<{
  'user-question': [{ question: string; difficulty: 'Facile' | 'Moyen' | 'Difficile' }]
}>()

const props = defineProps<{ loading: boolean }>()
const handleTextButton = computed(() => {
  return props.loading ? 'génération en cours' : 'génére ton quiz'
})
const isInvalid = computed(() => {
  if (!hasBeenTouched.value) return undefined
  //  if (props.loading) return undefined
  return !yourQuestion.value.trim()
})
const handleInput = () => {
  hasBeenTouched.value = true
  if (isInvalid.value) {
    yourQuestion_input.value?.focus()
    return
  } else {
    emit('user-question', { question: yourQuestion.value, difficulty: difficulty.value })
  }
  yourQuestion.value = ''
  hasBeenTouched.value = false
}
</script>

<template>
  <label for="youQuestion">your question: {{ yourQuestion }} | loading: {{ loading }}</label>
  <input
    type="text"
    id="youQuestion"
    ref="yourQuestion_input"
    name="youQuestion"
    v-model="yourQuestion"
    placeholder="ask a question"
    :aria-invalid="isInvalid"
    @blur="hasBeenTouched = true"
    aria-labelledby="input-error"
  />
  <small v-show="isInvalid" id="input-error" aria-invalid="true">texte n'est pas valide!</small>

  <label for="difficuty">select a level: {{ difficulty }}</label>
  <select id="difficuty" name="difficuty" v-model="difficulty">
    <option value="Facile" default>Facile</option>
    <option value="Moyen">Moyen</option>
    <option value="Difficile">Difficile</option>
  </select>

  <button @click="handleInput" :disabled="isInvalid || props.loading" :aria-busy="props.loading">
    {{ handleTextButton }}
  </button>
</template>
