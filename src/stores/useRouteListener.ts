import { CREATE, EDIT } from '@/constants'
import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export const useRouteListener = defineStore('routeListener', () => {
  const router = useRouter()

  const isBoardModalOpen = ref(false)
  const isTaskModalOpen = ref(false)
  const action = ref<typeof CREATE | typeof EDIT | null>(null)

  watchEffect(() => {
    const { boardAction, taskAction } = router.currentRoute.value.query
    if (boardAction === CREATE || boardAction === EDIT) {
      isBoardModalOpen.value = true
      action.value = boardAction
    }
    if (taskAction === CREATE || taskAction === EDIT) {
      isTaskModalOpen.value = true
      action.value = taskAction
    }

    if (!boardAction && !taskAction) {
      isBoardModalOpen.value = false
      isTaskModalOpen.value = false
      action.value = null
    }
  })

  return {
    isBoardModalOpen,
    isTaskModalOpen,
    action
  }
})
