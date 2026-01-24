<script lang="ts" setup>
import type { Quiz } from '../type/Type'

defineProps<{
  answer: Quiz | null
  contexte?: string | null
  url?: string
}>()
</script>

<template>
  <section class="container">
    <details name="url" v-if="url">
      <summary role="button" class="outline secondary">URL</summary>
      <pre><code> {{ url }}</code></pre>
    </details>
    <details name="contexte" v-if="contexte">
      <summary role="button" class="outline secondary">markdown</summary>
      <pre><code> {{ contexte }}</code></pre>
    </details>
    <details name="api">
      <summary role="button" class="outline secondary">API</summary>
      <pre><code> {{ answer }}</code></pre>
    </details>
  </section>
</template>
