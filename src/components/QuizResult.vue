<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { computed, inject } from 'vue'
import type { quizResponse } from '../type/Type'
const props = defineProps<{ answer: quizResponse; userAnswers: (number | null)[] }>()
const emit = defineEmits<{
  'new-quiz': [boolean]
}>()
// to do ameliore layout result
const quizResult = computed(() => {
  if (!props.answer) return []
  return props.answer.quiz_questions.map((question, index) => {
    const questionText = question.question_text
    const userAnswer = props.userAnswers[index]
    const choices = question.choices
    const correctAnswer = question.correct_answer_index
    const correctAnswerText = choices[question.correct_answer_index]
    const userAnswerText = userAnswer !== null ? choices[userAnswer] : null
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
const handleNewQuiz = () => {
  emit('new-quiz', true)
}
const scoreUser = computed(() => {
  if (!props.answer || !quizResult.value) {
    return '0%'
  }
  const score = quizResult.value.filter((response) => response.isCorrect === true)
  return Math.round((score.length / props.answer?.quiz_questions.length) * 100) + '%'
})

const allowDebug = inject('allowDebug')
</script>

<template>
  <section>
    <h1 class="center">{{ t('quiz.score', { score: scoreUser }) }}</h1>
    <ul class="questions">
      <li v-for="result in quizResult" :key="result.questionText">
        <article>
          <header>Question: {{ result.questionText }}</header>
          <ul>
            <li v-for="(choice, index) in result.choices" :key="choice">
              <p
                :class="
                  result.userAnswer == index && result.isCorrect
                    ? 'valide'
                    : result.userAnswer == index && !result.isCorrect
                      ? 'invalide'
                      : result.correctAnswer == index
                        ? 'valide'
                        : ''
                "
                :aria-label="
                  result.userAnswer == index && result.isCorrect
                    ? t('quiz.answer.good')
                    : result.userAnswer == index && !result.isCorrect
                      ? t('quiz.answer.bad')
                      : result.correctAnswer == index
                        ? t('quiz.answer.good')
                        : ''
                "
              >
                {{ choice }}
              </p>
            </li>
          </ul>
          <footer>
            <p v-if="result.userAnswerText">
              {{ result.isCorrect ? t('quiz.answer.good') : t('quiz.answer.bad') }}
            </p>
            <p v-else>{{ t('quiz.answer.skiped') }}</p>
          </footer>
        </article>
      </li>
    </ul>
  </section>
  <button @click="handleNewQuiz">{{ t('common.restart') }}</button>

  <section v-if="allowDebug">
    <code>
      <pre>{{ quizResult }}</pre>
      <small
        >Score: {{ quizResult.filter((r) => r.isCorrect).length }} /
        {{ answer.quiz_questions.length }}</small
      >
      <small>nombre de question : {{ answer.quiz_questions.length }} | </small>
      <small
        >correct[]:
        {{ answer.quiz_questions.map((correctAnswer) => correctAnswer.correct_answer_index) }}
      </small>
      <small>user[]: {{ userAnswers }}</small>
    </code>
  </section>
</template>

<style lang="scss" scoped>
.valide {
  color: var(--pico-primary);
}
.invalide {
  color: #d92662;
}
ul {
  padding-inline-start: 0;
  &.questions li {
    list-style: none;
  }
}
pre {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
