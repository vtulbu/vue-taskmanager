import router from '@/router'
import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useSidebar = defineStore('sidebar', () => {
  const boards = ref([
    { label: 'New', id: 'new' },
    { label: 'Delete', id: 'delete' }
  ])

  const isSidebarOpen = ref(false)
  const selectedItem = ref<{ id: string; label: string } | null>(null)

  watchEffect(() => {
    const boardId = router.currentRoute.value.query.boardId as string
    const board = boards.value.find((b) => b.id === boardId)
    if (board) {
      selectedItem.value = board
    }

    if (!selectedItem.value) {
      selectedItem.value = boards.value[0]
      router.push({
        name: 'Boards',
        query: {
          boardId: boards.value[0].id
        }
      })
    }
  })

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const selectItem = (item: { label: string; id: string }) => {
    selectedItem.value = item

    router.push({
      name: 'Boards',
      query: {
        boardId: item.id
      }
    })
  }

  const addNewBoard = (board: { label: string; id: string }) => {
    boards.value.push(board)
  }

  const deleteBoard = (board: { label: string; id: string }) => {
    const index = boards.value.findIndex((b) => b.id === board.id)
    boards.value.splice(index, 1)
  }

  return {
    isSidebarOpen,
    selectedItem,
    boards,
    toggleSidebar,
    selectItem,
    addNewBoard,
    deleteBoard
  }
})
