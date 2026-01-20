<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, onMounted, watch, nextTick } from 'vue'
import { Icon } from '@iconify/vue'

import { listQuizJson } from '../../scripts/db/service'
//import VueJsonPretty from 'vue-json-pretty'
//import 'vue-json-pretty/lib/styles.css'

import type { Quiz } from '@/type/Type'
import CardJson from '../ui/CardJson.vue'
//import { formatDate } from '@/utils/timeduration'
//import { copyData } from '@/utils/copyData'

const { t, locale } = useI18n()
const jsonList = ref<Quiz[] | null>([])
const isdbError = ref<boolean>(false)
const errorMessageRef = ref<HTMLDivElement | undefined>(undefined)
const getListQuiz = async () => {
  try {
    jsonList.value = await listQuizJson()
  } catch (error) {
    console.log(error)
    isdbError.value = true
  }
}
watch(
  isdbError,
  () => {
    nextTick(() => errorMessageRef.value?.focus())
  },
  { flush: 'post' },
)
onMounted(() => {
  getListQuiz()
})
</script>

<template>
  <section>
    <h1>todo</h1>
    <p>description breve to do</p>
    <section v-if="isdbError" ref="errorMessageRef" role="alert" tabindex="-1">
      <p class="error">
        <Icon
          aria-hidden="true"
          class="icon"
          icon="game-icons:alien-skull"
          width="32"
          height="32"
        />
        {{ t('messages.dbError') }}
      </p>
    </section>
    <div class="grid">
      <card-json v-for="quiz in jsonList" :quiz="quiz" :key="quiz.id" :locale="locale" />
    </div>
  </section>
</template>
<style scoped>
.icon-copy {
  background: transparent;
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  }
}
</style>
