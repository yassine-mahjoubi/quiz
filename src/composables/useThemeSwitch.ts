import { ref, watchEffect } from 'vue'

const dataTheme: HTMLElement | null = document.querySelector('html')
const savedThemeChoice = localStorage.getItem('mode')
const startWithDarkMode = savedThemeChoice === 'dark'
const enabledDarkMode = ref<boolean>(startWithDarkMode)
watchEffect(() => {
  const newThemeChoice = enabledDarkMode.value ? 'dark' : 'light'
  if (dataTheme) {
    dataTheme.setAttribute('data-theme', newThemeChoice)
  }
  localStorage.setItem('mode', newThemeChoice)
})
const toggleMode = () => {
  enabledDarkMode.value = !enabledDarkMode.value
}
export const useThemeSwitcher = () => {
  return { toggleMode, enabledDarkMode }
}
