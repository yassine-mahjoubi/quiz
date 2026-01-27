<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { useQuizStore } from '@/stores/quiz'

const store = useQuizStore()
const { newQuiz } = storeToRefs(store)
const handlenewQuiz = () => (newQuiz.value = true)
</script>
<template>
  <Icon
    aria-hidden="true"
    class="icon"
    icon="game-icons:wisdom"
    width="40"
    height="40"
    @click="handlenewQuiz"
  />
</template>
