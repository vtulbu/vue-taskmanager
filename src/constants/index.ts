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
            id: 'task2',
            title: 'Task2',
            description: 'here',
            subtasks: [
              {
                id: 'subtask1',
                label: 'Subtask 1',
                isDone: false
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
            description: 'here',
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
