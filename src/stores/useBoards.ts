import { boardsMock } from '@/constants'
import { camelCase } from 'lodash'
import { defineStore, storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteListener } from './useRouteListener'

export const useBoards = defineStore('boards', () => {
  const router = useRouter()
  const boards = ref(boardsMock)
  const selectedItem = ref<(typeof boardsMock)[0] | undefined>(undefined)
  const routeListener = useRouteListener()
  const { isRouterReady } = storeToRefs(routeListener)

  const selectItem = (id: string, cleanQuery?: boolean) => {
    const board = boards.value.find((b) => b.id === id)

    if (board) {
      selectedItem.value = board

      if (cleanQuery) {
        router.push({
          name: 'Boards',
          query: {
            boardId: board.id
          }
        })
      } else {
        router.push({
          name: 'Boards',
          query: {
            ...router.currentRoute.value.query,
            boardId: board.id
          }
        })
      }
    }
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
    selectItem(board.id, true)
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

    selectItem(boards.value[index].id, true)
  }

  const deleteBoard = (id: string) => {
    const index = boards.value.findIndex((b) => b.id === id)
    boards.value.splice(index, 1)
  }

  const createTask = (task: {
    title: string
    description: string
    columnId: string | null
    subtasks: string[]
  }) => {
    const column = selectedItem.value?.columns.find((c) => c.id === task.columnId)

    if (column) {
      column.tasks.push({
        id: camelCase(task.title),
        title: task.title,
        description: task.description,
        subtasks: task.subtasks.map((s) => {
          return {
            id: camelCase(s),
            label: s,
            isDone: false
          }
        })
      })

      router.push({
        name: 'Boards',
        query: {
          boardId: selectedItem.value?.id
        }
      })
    }
  }

  watchEffect(() => {
    const { boardId } = router.currentRoute.value.query

    if (isRouterReady.value) {
      if (boardId) {
        const board = boards.value.find((b) => b.id === boardId)

        if (board) {
          selectedItem.value = board
        } else {
          selectItem(boards.value[0].id, true)
        }
      } else {
        selectItem(boards.value[0].id, true)
      }
    }
  })

  return {
    selectedItem,
    boards,
    addNewBoard,
    deleteBoard,
    updateBoard,
    createTask
  }
})
