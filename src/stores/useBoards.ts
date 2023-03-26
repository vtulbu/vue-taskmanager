import { boardsMock } from '@/constants'
import { camelCase, uniqueId } from 'lodash'
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

  const addNewBoard = (newBoard: { name: string; columns: { id?: string; label: string }[] }) => {
    const board = {
      id: uniqueId(camelCase(newBoard.name)),
      label: newBoard.name,
      columns: newBoard.columns.map((c) => {
        return {
          id: uniqueId(camelCase(c.label)),
          label: c.label,
          tasks: []
        }
      })
    }
    boards.value.push(board)
    selectItem(board.id, true)
  }

  const updateBoard = (
    board: { name: string; columns: { id?: string; label: string }[] },
    id: string
  ) => {
    const index = boards.value.findIndex((b) => b.id === id)

    const currentBoard = boards.value[index]

    boards.value[index] = {
      id,
      label: board.name,
      columns: board.columns.map((c) => {
        const column = currentBoard.columns.find((col) => col.id === c.id)

        if (column) {
          return {
            id: column.id,
            label: c.label,
            tasks: column.tasks
          }
        }

        return {
          id: uniqueId(camelCase(c.label)),
          label: c.label,
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
    subtasks: { id?: string; label: string }[]
  }) => {
    const column = selectedItem.value?.columns.find((c) => c.id === task.columnId)

    if (column) {
      column.tasks.push({
        id: uniqueId(camelCase(task.title)),
        title: task.title,
        description: task.description,
        subtasks: task.subtasks.map((s) => {
          return {
            id: uniqueId(camelCase(s.label)),
            label: s.label,
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

  const updateTask = (
    task: {
      title: string
      description: string
      columnId: string | null
      subtasks: { id?: string; label: string }[]
    },
    editedTaskId: string
  ) => {
    const { columnId } = router.currentRoute.value.query
    const currentColumn = selectedItem.value?.columns.find((c) => c.id === columnId)
    const taskIndex = currentColumn?.tasks.findIndex((t) => t.id === editedTaskId)

    if (taskIndex !== undefined && taskIndex !== -1) {
      const column = selectedItem.value?.columns.find((c) => c.id === task.columnId)

      if (column) {
        column.tasks.push({
          id: editedTaskId,
          title: task.title,
          description: task.description,
          subtasks: task.subtasks.map((s) => {
            const subtask = currentColumn?.tasks[taskIndex]?.subtasks.find((sub) => sub.id === s.id)

            if (subtask) {
              return {
                id: subtask.id,
                label: s.label,
                isDone: subtask.isDone
              }
            }

            return {
              id: uniqueId(camelCase(s.label)),
              label: s.label,
              isDone: false
            }
          })
        })

        currentColumn?.tasks.splice(taskIndex, 1)

        router.push({
          name: 'Boards',
          query: {
            boardId: selectedItem.value?.id
          }
        })
      }
    }
  }

  const deleteTask = (taskId: string) => {
    const { columnId } = router.currentRoute.value.query
    const column = selectedItem.value?.columns.find((c) => c.id === columnId)
    const taskIndex = column?.tasks.findIndex((t) => t.id === taskId)

    if (taskIndex !== undefined && taskIndex !== -1) {
      column?.tasks.splice(taskIndex, 1)
    }
  }

  const updateTaskStatus = (newColumnId: string) => {
    const { columnId, taskId } = router.currentRoute.value.query

    const newColumn = selectedItem.value?.columns.find((c) => c.id === newColumnId)
    const oldColumn = selectedItem.value?.columns.find((c) => c.id === columnId)
    const taskIndex = oldColumn?.tasks.findIndex((t) => t.id === taskId)

    if (taskIndex !== undefined && taskIndex !== -1 && oldColumn) {
      newColumn?.tasks.push(oldColumn?.tasks[taskIndex])
      oldColumn?.tasks.splice(taskIndex, 1)
    }
  }

  const updateSubtaskStatus = (checkedSubtaskIds: string[] | undefined) => {
    const { columnId, taskId } = router.currentRoute.value.query
    const column = selectedItem.value?.columns.find((c) => c.id === columnId)
    const task = column?.tasks.find((t) => t.id === taskId)

    task?.subtasks.forEach((s) => {
      s.isDone = checkedSubtaskIds?.includes(s.id) || false
    })
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
    createTask,
    deleteTask,
    updateTask,
    updateTaskStatus,
    updateSubtaskStatus
  }
})
