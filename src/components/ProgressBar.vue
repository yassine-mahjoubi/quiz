<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    completedSteps?: number
    totalSteps?: number
    progressType: boolean
  }>(),
  {
    completedSteps: 0,
    totalSteps: 0,
    progressType: false,
  },
)

const progressPercentage = computed<number | undefined>(() => {
  if (!props.progressType) {
    return undefined
  }
  if (props.totalSteps === 0) {
    return 0
  }
  return (props.completedSteps / props.totalSteps) * 100
})
</script>
<template>
  <progress
    :value="progressPercentage"
    max="100"
    aria-label="génération de quiz en cours"
  ></progress>
</template>
