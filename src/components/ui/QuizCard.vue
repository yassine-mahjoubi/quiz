<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import VueJsonPretty from 'vue-json-pretty'
import { formatDate } from '@/utils/timeduration'
import { copyData } from '@/utils/copyData'
import 'vue-json-pretty/lib/styles.css'
import type { QuizDB } from '@/type/Type'

const { t } = useI18n()
const { quiz, locale } = defineProps<{
  quiz: QuizDB
  locale: string
}>()
const date = computed(() => formatDate(quiz.created_at, locale))
const category = quiz?.tags[2]
</script>

<template>
  <article>
    <header>
      <ul class="list-infos">
        <span class="category">{{ category }}</span>
        <li>
          <span>{{ t('quizLibrary.cardQuiz.subject') }}: </span><strong>{{ quiz.subject }} </strong>
        </li>
        <li>
          <span>{{ t('quizLibrary.cardQuiz.numQuestions') }}: </span>{{ quiz.number_question }}
        </li>
        <li>
          <span>{{ t('quizLibrary.cardQuiz.difficulty') }}: </span>{{ quiz.difficulty }}
        </li>
        <li>
          <span>{{ t('quizLibrary.cardQuiz.model') }}: </span>{{ quiz.model }}
        </li>

        <li>
          <time data-time="date">{{ date }}</time>
        </li>
        <li>{{ quiz.language === 'fr' ? 'Français' : 'Anglais' }}</li>
      </ul>
    </header>
    <details :name="quiz.subject">
      <summary role="button" class="outline secondary">JSON</summary>
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
      <summary role="button" class="outline secondary">markdown</summary>
      <div>{{ quiz.context_md }}</div>
    </details>

    <details :name="quiz.url" v-if="quiz.url">
      <summary role="button" class="outline secondary">
        {{ t('quizLibrary.cardQuiz.sourceUrl') }}
      </summary>

      <div>
        <a :href="quiz.url" target="_blank" :title="t('concept.linkLabel.newWindow')">{{
          quiz.url
        }}</a>
      </div>
    </details>

    <footer>
      <ul class="tags">
        <li v-for="tag in quiz.tags" :key="tag" class="tag">{{ tag }}</li>
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
  .tag {
    list-style: none;
    padding: 0.5rem;
    border-radius: var(--pico-border-radius);
    background-color: var(--pico-background-color);
    box-shadow: var(--pico-box-shadow);
    font-size: small;
  }
}
.list-infos {
  position: relative;
  padding-left: 1rem;
  .category {
    position: absolute;
    right: 0;
    top: 0;
    background-color: var(--pico-primary-background);
    box-shadow: var(--pico-box-shadow);
    font-size: small;
    padding: 0.5rem;
    font-weight: bold;
  }
}
.url {
  line-break: anywhere;
}
</style>
