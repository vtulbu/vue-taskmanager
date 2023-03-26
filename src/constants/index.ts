export const screenSizes = {
  xs: 0,
  sm: 375,
  md: 768,
  lg: 1440
} as const

export const boardsMock = [
  {
    id: 'new',
    label: 'New',
    columns: []
  },
  {
    id: 'delete',
    label: 'Delete',
    columns: [
      {
        id: 'test1',
        label: 'Test 1',
        tasks: [
          {
            id: 'task1',
            title: 'Task1',
            description:
              "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
            subtasks: [
              {
                id: 'subtask1',
                label: 'Subtask 1',
                isDone: true
              }
            ]
          }
        ]
      },
      {
        id: 'test2',
        label: 'Test 2',
        tasks: [
          {
            id: 'task2',
            title: 'Task2',
            description:
              "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
            subtasks: [
              {
                id: 'subtask2',
                label: 'Subtask 2',
                isDone: false
              }
            ]
          }
        ]
      }
    ]
  }
]

export const CREATE = 'create' as const
export const EDIT = 'edit' as const
export const DELETE = 'delete' as const
export const VIEW = 'view' as const

export const TASK = 'task' as const
export const BOARD = 'board' as const
