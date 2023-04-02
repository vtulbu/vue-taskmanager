export const screenSizes = {
  xs: 0,
  sm: 375,
  md: 768,
  lg: 1440
} as const

export const boardsMock = Array.from({ length: 10 }, (_, i) => ({
  id: `board-${i}`,
  label: `Board ${i}`,
  columns: Array.from({ length: 6 }, (_, j) => ({
    id: `column-${i}-${j}`,
    label: `Column ${j}`,
    tasks: Array.from({ length: 6 }, (_, k) => ({
      id: `task-${i}-${j}-${k}`,
      title: `Task ${k}`,
      description: `Description ${k}: We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.`,
      subtasks: Array.from({ length: 5 }, (_, l) => ({
        id: `subtask-${i}-${j}-${k}-${l}`,
        label: `Subtask ${l}`,
        isDone: l % 2 === 0
      }))
    }))
  }))
}))

export const CREATE = 'create' as const
export const EDIT = 'edit' as const
export const DELETE = 'delete' as const
export const VIEW = 'view' as const

export const TASK = 'task' as const
export const BOARD = 'board' as const
