<script lang="ts" setup>
import type { Quiz } from '@/type/Type'
import { Icon } from '@iconify/vue'

import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

import { formatDate } from '@/utils/timeduration'
import { copyData } from '@/utils/copyData'
import { computed } from 'vue'

const { quiz, locale } = defineProps<{
  quiz: Quiz
  locale: string
}>()
const date = computed(() => formatDate(quiz.created_at, locale))
</script>

<template>
  <article>
    <header>
      question:{{ quiz.subject }} | nombre de question: {{ quiz.number_question }} | niveau:
      {{ quiz.difficulty }} | model basé sur {{ quiz.model }}
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
      />
    </details>
    <details :name="quiz.subject" v-if="quiz.context_md">
      <summary role="button" class="outline secondary">voir le markdown</summary>
      <button @click="copyData(quiz.context_md)" class="icon-copy">
        <Icon icon="cil:copy" width="16" height="16" style="color: currentColor" />
      </button>
      <div>{{ quiz.context_md }}</div>
    </details>
    <footer>
      <time data-time="date">{{ date }}</time> |
      <span class="">{{ quiz.language }}</span>
    </footer>
  </article>
</template>
<style>
.icon-copy {
  background: transparent;
}
</style>
