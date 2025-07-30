<script lang="ts" setup>
import { computed } from 'vue'
import type { quizResponse } from '../type/Type'
const props = defineProps<{ answer: quizResponse; userAnswers: (number | null)[] }>()

// to do ameliore layout result
const quizResult = computed(() => {
  if (!props.answer) return []
  return props.answer.quiz_questions.map((question, index) => {
    const questionText = question.question_text
    const userAnswer = props.userAnswers[index]
    const choices = question.choices
    const correctAnswer = question.correct_answer_index
    const correctAnswerText = choices[question.correct_answer_index]
    const userAnswerText = userAnswer !== null ? choices[userAnswer] : 'non répondu'
    return {
      userAnswerText: userAnswerText,
      questionText: questionText,
      correctAnswerText: correctAnswerText,
      userAnswer: userAnswer,
      correctAnswer: correctAnswer,
      choices: choices,
      isCorrect: userAnswer !== null && userAnswer == correctAnswer,
    }
  })
})
</script>

<template>
  <ul>
    <li v-for="result in quizResult" :key="result.questionText">
      <article :class="result.isCorrect ? 'corret' : 'incorrect'">
        <header>{{ result.questionText }}</header>
        <ul>
          <li v-for="choice in result.choices" :key="choice">
            <span>{{ choice }}</span>
          </li>
        </ul>
        <footer>
          <p>réponse correcte: {{ result.correctAnswerText }}</p>
          <p>vous avez répondu : {{ result.userAnswerText }}</p>
        </footer>
      </article>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.corret {
  border: 1px solid green;
}
.incorrect {
  border: 1px solid red;
}
</style>
