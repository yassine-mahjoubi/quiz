<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { listQuizJson } from '../../scripts/db/service'
import QuizCard from '../ui/QuizCard.vue'
import type { Quiz } from '@/type/Type'

const { t, locale } = useI18n()
const quizes = ref<Quiz[] | null>([])
const isdbError = ref<boolean>(false)
const errorMessageRef = ref<HTMLDivElement | undefined>(undefined)
const loading = ref<boolean>(false)
const elementByPage = 3
const from = ref<number>(0)
const to = ref<number>(elementByPage)
const totalPges = ref<number | null>(null)
//const currentPage = ref<number>(1)

const getListQuiz = async (from: number, to: number) => {
  try {
    loading.value = true
    const { data, count } = await listQuizJson(from, to)
    quizes.value = data
    totalPges.value = Math.ceil((count ?? 0) / elementByPage)
  } catch (error) {
    console.log(error)
    isdbError.value = true
  } finally {
    loading.value = false
  }
}

const nextPage = () => {
  from.value = from.value + elementByPage
  to.value = from.value + elementByPage - 1
  getListQuiz(from.value, to.value)
}
const previousPage = () => {
  from.value = from.value - elementByPage
  to.value = from.value + elementByPage - 1
  getListQuiz(from.value, to.value)
}

watch(
  isdbError,
  () => {
    nextTick(() => errorMessageRef.value?.focus())
  },
  { flush: 'post' },
)
onMounted(() => {
  getListQuiz(from.value, to.value)
})
</script>

<template>
  <section>
    <h1>{{ t('pages.gallery.title') }} : {{ from }} - {{ to }} / {{ totalPges }}</h1>
    <p>{{ t('pages.gallery.content') }}</p>
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
      <template v-if="loading">
        <article
          class="placeholder_card"
          v-for="element in 2"
          :key="`${element}-id`"
          aria-busy="true"
          aria-label="loading"
        ></article>
      </template>
      <quiz-card
        v-for="quiz in quizes"
        :quiz="quiz"
        :key="quiz.id"
        :locale="locale"
        :loading="loading"
      />
    </div>
  </section>
  <section>
    <button @click="previousPage">précident</button>
    <button @click="nextPage">suivant</button>
  </section>
</template>
<style scoped>
.icon-copy {
  background: transparent;
}
.placeholder_card {
  min-height: 490px;
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  }
}
</style>
