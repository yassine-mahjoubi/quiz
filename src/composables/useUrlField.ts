import { ref, useTemplateRef, computed, type Ref } from 'vue'
import { useInputCheck } from '@/utils/validateInputUrl'

export const useUrlField = (element: string, enableContext: Ref<boolean>) => {
  const Inputvalue = ref<string>('')
  const elementRef = useTemplateRef<HTMLInputElement | null>(element)
  const hasBeenTouched = ref<boolean>(false)

  //handleBlur
  const markAsTouched = (): void => {
    hasBeenTouched.value = true
  }

  const isInvalid = computed(() => {
    if (!hasBeenTouched.value || !enableContext.value) return undefined
    return !useInputCheck(Inputvalue.value)
  })

  const validate = () => {
    hasBeenTouched.value = true
    if (isInvalid.value) {
      elementRef.value?.focus()
      return false
    } else {
      return true
    }
  }

  return {
    Inputvalue,
    markAsTouched,
    isInvalid,
    validate,
  }
}
