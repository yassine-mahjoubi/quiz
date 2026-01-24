<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

import VueJsonPretty from 'vue-json-pretty'
import { formatDate } from '@/utils/timeduration'
import { copyData } from '@/utils/copyData'
import 'vue-json-pretty/lib/styles.css'
import type { QuizCard } from '@/type/Type'

const { t } = useI18n()
const { quiz, locale } = defineProps<{
  quiz: QuizCard
  locale: string
}>()
const date = computed(() => formatDate(quiz.created_at, locale))
</script>

<template>
  <article>
    <header>
      <ul>
        <li>
          <span class="infos">{{ t('quizLibrary.cardQuiz.subject') }}: </span
          ><strong>{{ quiz.subject }} </strong>
        </li>
        <li>
          <span class="infos">{{ t('quizLibrary.cardQuiz.numQuestions') }}: </span
          >{{ quiz.number_question }}
        </li>
        <li>
          <span class="infos">{{ t('quizLibrary.cardQuiz.difficulty') }}: </span
          >{{ quiz.difficulty }}
        </li>
        <li>
          <span class="infos">{{ t('quizLibrary.cardQuiz.model') }}: </span>{{ quiz.model }}
        </li>
        <li v-if="quiz.url">
          <span class="infos">{{ t('quizLibrary.cardQuiz.sourceUrl') }}: </span>{{ quiz.url }}
        </li>

        <li>
          <time data-time="date">{{ date }}</time>
        </li>
        <li>{{ quiz.language === 'fr' ? 'Français' : 'Anglais' }}</li>
      </ul>
    </header>
    <details :name="quiz.subject">
      <summary role="button" class="outline secondary">
        {{ t('quizLibrary.cardQuiz.show') }} JSON
      </summary>
      <button @click="copyData(quiz.quiz_json)" class="icon-copy" title="copy">
        <Icon icon="cil:copy" width="16" height="16" style="color: currentColor" />
      </button>
      <vue-json-pretty
        :data="JSON.parse(quiz.quiz_json)"
        theme="dark"
        :show-line="false"
        :show-line-number="true"
        :select-on-click-node="false"
      />
    </details>
    <details :name="quiz.subject" v-if="quiz.context_md">
      <summary role="button" class="outline secondary">
        {{ t('quizLibrary.cardQuiz.show') }} markdown
      </summary>
      <div>{{ quiz.context_md }}</div>
    </details>
    <footer>
      <ul class="tags">
        <li v-for="tag in quiz.tags" :key="tag">{{ tag }}</li>
      </ul>
    </footer>
  </article>
</template>
<style>
details {
  position: relative;
}
.icon-copy {
  position: absolute;
  right: 0;
  border: transparent;
}

.vjs-value-string {
  color: var(--pico-primary);
}
.vjs-node-index {
  right: initial;
  left: 0;
}
.vjs-tree-node {
  position: initial;
}
.tags {
  display: inline-flex;
  margin: 0;
  width: auto;
  padding: 0;
  gap: 10px;
  li {
    list-style: none;
    padding: 0.5rem;
    border-radius: var(--pico-border-radius);
    background-color: var(--pico-background-color);
    box-shadow: var(--pico-box-shadow);
  }
}
</style>
