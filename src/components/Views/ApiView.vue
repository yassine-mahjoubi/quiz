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

const nextPage = () => {
  currentPage.value++
  getListQuiz(from.value, to.value)
}
const previousPage = () => {
  currentPage.value--
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
    <nav role="navigation" aria-label="pagination">
      <button @click="previousPage" v-if="currentPage > 1">{{ t('common.previous') }}</button>
      <div class="pagination">
        <button
          v-for="page in totalPges"
          :key="page"
          @click="currentPage = page"
          :disabled="currentPage == page"
          :title="`page ${page} sur ${totalPges}`"
        >
          {{ page }}
        </button>
      </div>
      <button @click="nextPage" v-if="currentPage < totalPges">{{ t('common.next') }}</button>
    </nav>
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
.pagination {
  display: flex;
  gap: 1rem;
}
</style>
