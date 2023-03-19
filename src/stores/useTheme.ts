import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'

export const useTheme = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')
  const link = document.createElement('link')
  link.id = 'theme-link'
  link.rel = 'stylesheet'
  document.head.appendChild(link)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watchEffect(() => {
    if (isDark.value) {
      link.href = '/themes/dark.css'
    } else {
      link.href = '/themes/light.css'
    }
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  })

  return { isDark, toggleTheme }
})
