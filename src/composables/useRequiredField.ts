import { ref, useTemplateRef, computed } from 'vue'

export const useRequiredField = (element: string) => {
  const value = ref<string>('')
  const elementRef = useTemplateRef<HTMLInputElement | null>(element)
  const hasBeenTouched = ref<boolean>(false)
  //handleBlur
  const markAsTouched = (): void => {
    hasBeenTouched.value = true
  }

  const isInvalid = computed<boolean | undefined>(() => {
    if (!hasBeenTouched.value) return undefined
    return !value.value.trim()
  })

  const canSubmit = computed<boolean>(() => {
    return !value.value.trim()
  })

  const validate = (): boolean => {
    markAsTouched()
    if (isInvalid.value) {
      elementRef.value?.focus()
      return false
    } else {
      return true
    }
  }

  return {
    value,
    markAsTouched,
    isInvalid,
    validate,
    canSubmit,
  }
}
