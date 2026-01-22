<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, watch, nextTick, computed, useTemplateRef } from 'vue'
import { Icon } from '@iconify/vue'
import { listQuizJson } from '../../scripts/db/service'
import QuizCard from '../ui/QuizCard.vue'
import NavPagination from '../ui/NavPagination.vue'
import type { Quiz } from '@/type/Type'

const { t, locale } = useI18n()
const quizes = ref<Quiz[]>([])
const isdbError = ref<boolean>(false)

const errorMessage = useTemplateRef<HTMLElement>('errorMessageRef')
const loading = ref<boolean>(false)

const elementByPage = 2
const currentPage = ref<number>(1)
const from = computed(() => (currentPage.value - 1) * elementByPage)
const to = computed(() => from.value + elementByPage - 1)
const totalPges = ref<number>(0)

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

watch(
  isdbError,
  () => {
    nextTick(() => errorMessage.value?.focus())
  },
  { flush: 'post' },
)
watch(currentPage, () => getListQuiz(from.value, to.value), { immediate: true })
</script>

<template>
  <section>
    <h1>{{ t('pages.gallery.title') }}</h1>
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
          v-for="element in elementByPage"
          :key="`${element}-id`"
          aria-busy="true"
          aria-label="loading"
        ></article>
      </template>
      <template v-else>
        <quiz-card
          v-for="quiz in quizes"
          :quiz="quiz"
          :key="quiz.id"
          :locale="locale"
          :loading="loading"
        />
      </template>
    </div>
  </section>
  <section v-if="totalPges > 1">
    <nav-pagination :total-pages="totalPges" v-model:current-page="currentPage" />
  </section>
</template>
<style scoped>
.placeholder_card {
  min-height: 490px;
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  }
}
</style>
