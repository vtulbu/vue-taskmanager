import { CREATE, DELETE, EDIT, VIEW } from '@/constants'
import { defineStore } from 'pinia'
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export const useRouteListener = defineStore('routeListener', () => {
  const router = useRouter()
  const isRouterReady = ref(false)
  const isTaskModalOpen = ref(false)
  const isBoardModalOpen = ref(false)
  const isDeleteModalOpen = ref(false)
  const isViewTaskModalOpen = ref(false)
  const action = ref<typeof CREATE | typeof EDIT | typeof DELETE | typeof VIEW | null>(null)

  onMounted(async () => {
    await router.isReady()
    isRouterReady.value = true
  })

  watchEffect(() => {
    const { boardAction, taskAction } = router.currentRoute.value.query

    if (boardAction === CREATE || boardAction === EDIT) {
      isBoardModalOpen.value = true
      action.value = boardAction
    }
    if (taskAction === CREATE || taskAction === EDIT) {
      isTaskModalOpen.value = true
      isViewTaskModalOpen.value = false
      action.value = taskAction
    }
    if (boardAction === DELETE || taskAction === DELETE) {
      isDeleteModalOpen.value = true
      isViewTaskModalOpen.value = false
      action.value = DELETE
    }
    if (taskAction === VIEW) {
      isTaskModalOpen.value = false
      isDeleteModalOpen.value = false
      isViewTaskModalOpen.value = true
      action.value = VIEW
    }

    if (!boardAction && !taskAction) {
      isBoardModalOpen.value = false
      isTaskModalOpen.value = false
      isDeleteModalOpen.value = false
      isViewTaskModalOpen.value = false
      action.value = null
    }
  })

  return {
    isRouterReady,
    isBoardModalOpen,
    isTaskModalOpen,
    isDeleteModalOpen,
    isViewTaskModalOpen,
    action
  }
})
