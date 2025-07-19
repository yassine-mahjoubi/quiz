<script setup lang="ts">
import { computed, ref } from 'vue'
import { generateQuiz } from './scripts/service'
import type { quizResponse } from './type/Type'
import slugify from 'slugify'

import QuizDisplay from './components/QuizDisplay.vue'
import QuizForm from './components/QuizForm.vue'

const yourQuestion = ref<string>('')
const difficuty = ref<'Facile' | 'Moyen' | 'Difficile'>('Facile') // Default difficulty level

const msg = ref<string>('')
const answer = ref<quizResponse>({ quiz_questions: [] })
const loading = ref<boolean>(false)
const yourQuestion_input = ref<HTMLInputElement | null>(null)
const hasBeenTouched = ref<boolean>(false)
const blocAnswer = ref<HTMLDivElement | null>(null)
const userAnswers = ref<number[]>([])
const showUserAnswers = ref<boolean[]>([])
const isInvalidAnswer = ref<(boolean | undefined)[]>([])

const handleGenerateQuiz = async () => {
  hasBeenTouched.value = true
  if (isInvalid.value) {
    console.log('isInvalid input request Quizz', isInvalid.value)
    yourQuestion_input.value?.focus()
    return
  }
  console.log('isInvalid', isInvalid)
  loading.value = true
  msg.value = 'Generating quiz...'

  try {
    const response = await generateQuiz(yourQuestion.value, difficuty.value)
    answer.value = <quizResponse>JSON.parse(response)
    msg.value = 'Quiz generated successfully sur: ' + yourQuestion.value
    showUserAnswers.value = answer.value.quiz_questions.map(() => false)
    isInvalidAnswer.value = answer.value.quiz_questions.map(() => undefined)

    yourQuestion.value = ''
    hasBeenTouched.value = false
    blocAnswer.value?.focus()
  } catch (error) {
    // Handle error appropriately
    console.error('Error generating quiz:', error)
    msg.value = 'An error occurred while generating the quiz.'
  } finally {
    loading.value = false
  }
}

const isInvalid = computed(() => {
  if (!hasBeenTouched.value) return undefined
  return !yourQuestion.value.trim()
})

const validateAnswer = (index: number) => {
  showUserAnswers.value[index] = true

  if (userAnswers.value[index] === answer.value.quiz_questions[index].correct_answer_index) {
    console.log('reponse juste')
    isInvalidAnswer.value[index] = false
  } else {
    isInvalidAnswer.value[index] = true
  }
}
</script>

<template>
  <main class="container" role="main">
    <quiz-display />
    <quiz-form />
    <h1>{{ msg }}</h1>
    <p v-if="loading">Loading...</p>
    <progress v-if="loading">Loading</progress>
    <label for="youQuestion">your question: {{ yourQuestion }}</label>
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
    <small v-if="isInvalid" id="input-error" aria-invalid="true">texte n'est pas valide!</small>

    <label for="difficuty">select a level: {{ difficuty }}</label>
    <select id="difficuty" name="difficuty" v-model="difficuty">
      <option value="Facile" default>Facile</option>
      <option value="Moyen">Moyen</option>
      <option value="Difficile">Difficile</option>
    </select>

    <button @click="handleGenerateQuiz" :disabled="isInvalid">génére ton quiz</button>
    <hr />
    <div ref="blocAnswer" tabindex="-1" aria-live="polite">
      <p v-if="answer">nombre de question {{ answer.quiz_questions.length }}</p>
      <fieldset v-for="(question, index) in answer.quiz_questions" :key="index">
        <legend>{{ question.question_text }}</legend>

        <template v-for="(choice, indexSelected) in question.choices" :key="choice">
          <label :for="`q-${index}-${slugify(choice)}`">
            <input
              type="radio"
              :value="indexSelected"
              :id="`q-${index}-${slugify(choice)}`"
              :name="`question-${index}`"
              v-model="userAnswers[index]"
              :aria-invalid="isInvalidAnswer[index]"
            />{{ choice }} | {{ userAnswers[index] }}
          </label>
        </template>
        <button @click="validateAnswer(index)">showResponse</button>
        <p>
          Your answer! : <span v-if="showUserAnswers[index]">{{ userAnswers[index] }}</span>
        </p>
        <p>Correct Answer: {{ question.correct_answer_index }}</p>
      </fieldset>
    </div>
    <pre class="container"><code>{{ answer }}</code></pre>
  </main>
</template>

<style scoped>
.bloc {
  max-width: max-content;
}
</style>
