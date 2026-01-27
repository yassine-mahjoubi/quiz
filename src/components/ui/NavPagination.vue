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
    <button @click="previousPage" :disabled="!(current > 1)" :aria-disabled="!(current > 1)">
      {{ t('common.previous') }}
    </button>
    <ul class="pagination">
      <li v-for="page in totalPages" :key="page">
        <a
          :href="`#${page}`"
          @click.prevent="current = page"
          :aria-current="current === page ? 'page' : undefined"
          :aria-disabled="current === page"
          :title="`page ${page}`"
          class="outline"
        >
          {{ page }}
        </a>
      </li>
    </ul>
    <button
      @click="nextPage"
      :disabled="!(current < totalPages)"
      :aria-disabled="!(current < totalPages)"
    >
      {{ t('common.next') }}
    </button>
  </nav>
</template>
<style lang="scss">
.pagination {
  display: flex;
  gap: 1rem;
}
.outline {
  border: 1px solid currentColor;
}
:where(button)[disabled][aria-disabled='true'],
:where(a)[aria-disabled='true'] {
  cursor: not-allowed;
  pointer-events: none;
  border: none;
}
</style>
