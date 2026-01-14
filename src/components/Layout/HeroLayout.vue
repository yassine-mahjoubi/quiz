<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import BaseModal from '../ui/BaseModal.vue'
/* to do teleport */
const { t } = useI18n()
</script>
<template>
  <section>
    <h1>{{ t('concept.title') }}</h1>
    <p>
      {{ t('concept.intro') }}

      <base-modal :style="'link'">
        <template #title>{{ t('concept.modal.title') }}</template>
        <template #content>{{ t('concept.modal.description') }}</template>
        <template #trigger>{{ t('concept.modal.link') }}</template>
      </base-modal>
    </p>
  </section>
  <hr />
</template>
