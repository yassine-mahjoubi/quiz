<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()
const props = withDefaults(
  defineProps<{
    completedSteps?: number
    totalSteps?: number
    progressType: boolean
  }>(),
  {
    completedSteps: 0,
    totalSteps: 0,
    progressType: true,
  },
)

const progressPercentage = computed<number>(() => {
  if (props.totalSteps === 0) {
    return 0
  }
  return (props.completedSteps / props.totalSteps) * 100
})
</script>
<template>
  <progress
    v-if="progressType"
    :value="progressPercentage"
    max="100"
    :aria-label="
      t('quiz.questionProgress', {
        current: completedSteps,
        total: totalSteps,
      })
    "
  ></progress>
  <progress v-else :aria-label="t('common.loading')"></progress>
</template>
