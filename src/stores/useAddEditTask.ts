import { boardsMock } from '@/constants'

import { camelCase } from 'lodash'
import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export const useAddEditTask = defineStore('addEditTask', () => {
  const router = useRouter()
  const boards = ref(boardsMock)
  const isCreating = ref(false)
  const isEditing = ref(false)
  const selectedItem = ref<(typeof boardsMock)[0] | undefined>(undefined)
  const isVisibleModal = computed(() => isCreating.value || isEditing.value)

  const selectItem = (id: string) => {
    selectedItem.value = boards.value.find((b) => b.id === id)

    router.push({
      name: 'Boards',
      query: {
        boardId: id
      }
    })
  }

  const addNewBoard = (newBoard: { name: string; columns: string[] }) => {
    const board = {
      id: camelCase(newBoard.name),
      label: newBoard.name,
      columns: newBoard.columns.map((c) => {
        return {
          id: camelCase(c),
          label: c,
          tasks: []
        }
      })
    }
    boards.value.push(board)

    selectItem(board.id)
  }

  const updateBoard = (board: { name: string; columns: string[] }, id: string) => {
    const index = boards.value.findIndex((b) => b.id === id)
    boards.value[index] = {
      id: camelCase(board.name),
      label: board.name,
      columns: board.columns.map((c) => {
        return {
          id: camelCase(c),
          label: c,
          tasks: []
        }
      })
    }

    selectItem(boards.value[index].id)
  }

  const deleteBoard = (id: string) => {
    const index = boards.value.findIndex((b) => b.id === id)
    boards.value.splice(index, 1)
  }

  const toggleCreatingModal = () => {
    isCreating.value = !isCreating.value
  }

  const toggleEditingModal = () => {
    isEditing.value = !isEditing.value
  }

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

  return {
    isCreating,
    isEditing,
    selectedItem,
    isVisibleModal,
    boards,
    selectItem,
    addNewBoard,
    deleteBoard,
    toggleCreatingModal,
    toggleEditingModal,
    updateBoard
  }
})
