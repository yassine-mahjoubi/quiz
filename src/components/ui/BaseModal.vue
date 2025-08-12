<script lang="ts" setup>
import { ref } from 'vue'

withDefaults(
  defineProps<{
    style?: null | 'link'
  }>(),
  {
    style: null,
  },
)
const dialog = ref<HTMLDialogElement>()
const openModal = () => {
  dialog.value?.showModal()
}
const closeModal = () => {
  dialog.value?.close()
}
</script>
<template>
  <button :class="[style ? 'link' : 'outline']" @click="openModal">
    <slot name="trigger">openModal</slot>
  </button>

  <dialog ref="dialog" id="dialog" aria-labelledby="title">
    <article>
      <header>
        <button aria-label="Close Modal" @click="closeModal" type="button">
          <slot name="icon">&times;</slot>
        </button>
        <h3 id="title"><slot name="title">title</slot></h3>
      </header>
      <p><slot name="content">some content..</slot></p>
    </article>
  </dialog>
</template>
<style scoped lang="scss">
header button {
  width: 1rem;
  height: 1rem;
  font-size: 2rem;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  &.link {
    all: unset;
    cursor: pointer;
    text-decoration: underline;
  }
  &.outline {
    padding: 5px;
  }
}
</style>
