import { screenSizes } from '@/constants'
import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useScreenSize = defineStore('screenSize', () => {
  const isMobile = ref(window.innerWidth < screenSizes.md)
  const isTablet = ref(window.innerWidth >= screenSizes.md && window.innerWidth < screenSizes.lg)
  const isDesktop = ref(window.innerWidth >= screenSizes.lg)

  watchEffect((onInvalidate) => {
    const mediaMobile = window.matchMedia(`(max-width: ${screenSizes.md - 1}px)`)
    const mediaTablet = window.matchMedia(
      `(min-width: ${screenSizes.md}px) and (max-width: ${screenSizes.lg}px)`
    )
    const mediaDesktop = window.matchMedia(`(min-width: ${screenSizes.lg}px)`)

    if (mediaMobile.matches !== isMobile.value) {
      isMobile.value = mediaMobile.matches
    }
    if (mediaTablet.matches !== isTablet.value) {
      isTablet.value = mediaTablet.matches
    }
    if (mediaDesktop.matches !== isDesktop.value) {
      isDesktop.value = mediaDesktop.matches
    }

    const onChange = () => {
      isMobile.value = mediaMobile.matches
      isTablet.value = mediaTablet.matches
      isDesktop.value = mediaDesktop.matches
    }

    mediaMobile.addEventListener('change', onChange)

    onInvalidate(() => {
      mediaMobile.removeEventListener('change', onChange)
    })
  })

  return { isMobile, isTablet, isDesktop }
})
