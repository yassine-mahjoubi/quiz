<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { t } = useI18n()

const externalTitle = computed(() => {
  return `${t('concept.linkLabel.viewSourceOn')} github ${t('concept.linkLabel.newWindow')}`
})
</script>
<template>
  <div class="layout" scoped>
    <a
      href="https://github.com/yassine-mahjoubi/quiz"
      target="_blank"
      :title="externalTitle"
      rel="noopener"
    >
      <Icon aria-hidden="true" class="icon" icon="bxl:github" width="64" height="64" />
    </a>
  </div>
</template>
<style lang="scss" scoped>
.layout {
  text-align: center;
}
</style>
