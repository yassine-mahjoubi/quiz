<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import getQuizJson from '../../scripts/db/service'

import type { Quiz } from '@/type/Type'
const { t } = useI18n()
const jsonList = ref<Quiz[]>()
onMounted(async () => {
  jsonList.value = await getQuizJson()
})
</script>

<template>
  <section>
    <h1></h1>
    <template v-for="quiz in jsonList" :key="quiz.id">
      <details :name="quiz.subject">
        <summary role="button" class="outline secondary">{{ quiz.subject }}</summary>
        <pre><code>{{ quiz }}</code></pre>
      </details>
    </template>
  </section>
</template>
