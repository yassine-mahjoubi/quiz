<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { ref, watch } from 'vue'
const { currentPage } = defineProps<{
  currentPage: number
  totalPages: number
}>()
const current = ref<number>(currentPage)

const emit = defineEmits<{
  'update:currentPage': [current: number]
}>()

const nextPage = () => {
  current.value++
}
const previousPage = () => {
  current.value--
}
watch(current, () => emit('update:currentPage', current.value))
</script>

<template>
  <nav role="navigation" aria-label="pagination">
    <button @click="previousPage" :disabled="!(current > 1)">
      {{ t('common.previous') }}
    </button>
    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="current = page"
        :disabled="current == page"
        :title="`page ${page} / ${totalPages}`"
        class="outline"
      >
        {{ page }}
      </button>
    </div>
    <button @click="nextPage" :disabled="!(current < totalPages)">
      {{ t('common.next') }}
    </button>
  </nav>
</template>
<style>
.pagination {
  display: flex;
  gap: 1rem;
}
</style>
