<script lang="ts" setup>
import { nextTick, ref } from 'vue'

withDefaults(
  defineProps<{
    style?: null | 'link'
  }>(),
  {
    style: null,
  },
)
const show = ref<boolean>(false)
const dialog = ref<HTMLDialogElement>()
const openModal = () => {
  show.value = true
  nextTick(() => dialog.value?.showModal())
}
const closeModal = () => {
  show.value = false

  dialog.value?.close()
}
</script>
<template>
  <button :class="[style ? 'link' : 'outline']" @click="openModal">
    <slot name="trigger">openModal</slot>
  </button>
  <teleport to="body">
    <dialog v-if="show" ref="dialog" id="dialog" aria-labelledby="title">
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
  </teleport>
</template>
<style scoped lang="scss">
dialog {
  opacity: 0;
  transform: scale(0.9);

  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    display 0.3s allow-discrete,
    overlay 0.3s allow-discrete;

  &[open] {
    opacity: 1;
    transform: scale(1);

    @starting-style {
      opacity: 0;
      transform: scale(0.9);
    }
  }
}
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
