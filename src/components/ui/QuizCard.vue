<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

import VueJsonPretty from 'vue-json-pretty'
import { formatDate } from '@/utils/timeduration'
import { copyData } from '@/utils/copyData'
import 'vue-json-pretty/lib/styles.css'
import type { Quiz } from '@/type/Type'

const { t } = useI18n()
const { quiz, locale } = defineProps<{
  quiz: Quiz
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
      </ul>
    </header>
    <details :name="quiz.subject">
      <summary role="button" class="outline secondary">voir le json</summary>
      <button @click="copyData(quiz.quiz_json)" class="icon-copy">
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
      <summary role="button" class="outline secondary">voir le markdown</summary>
      <div>{{ quiz.context_md }}</div>
    </details>
    <footer>
      <ul>
        <li>
          <time data-time="date">{{ date }}</time>
        </li>
        <li>{{ quiz.language === 'fr' ? 'Français' : 'Anglais' }}</li>
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
</style>
