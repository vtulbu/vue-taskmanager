<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoards, useRouteListener } from '@/stores'
import router from '@/router'
import { computed } from 'vue'
import { BOARD, DELETE, TASK, VIEW } from '@/constants'

const storeBoards = useBoards()
const storeRouteListener = useRouteListener()

const { selectedItem } = storeToRefs(storeBoards)
const { isDeleteModalOpen } = storeToRefs(storeRouteListener)

const deletedItem = computed(() => {
  const { boardAction, taskAction } = router.currentRoute.value.query

  if (boardAction === DELETE) {
    return BOARD
  } else if (taskAction === DELETE) {
    return TASK
  } else {
    return ''
  }
})

const task = computed(() => {
  const { taskId, columnId } = router.currentRoute.value.query

  if (taskId && columnId) {
    const column = selectedItem.value?.columns.find((column) => column.id === columnId)
    const task = column?.tasks.find((task) => task.id === taskId)

    return task
  }

  return null
})

const onCloseDialog = () => {
  router.push({
    query: {
      boardId: selectedItem.value?.id
    }
  })
}

const onConfirmDelete = () => {
  if (selectedItem.value && deletedItem.value === BOARD) {
    storeBoards.deleteBoard(selectedItem.value.id)
  } else if (deletedItem.value === TASK && task.value) {
    storeBoards.deleteTask(task.value.id)
  }

  router.push({
    query: {
      boardId: selectedItem.value?.id
    }
  })
}

const onCancel = () => {
  if (deletedItem.value === TASK) {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        taskAction: VIEW
      }
    })
    return
  }

  router.push({
    query: {
      boardId: selectedItem.value?.id
    }
  })
}
</script>

<template>
  <DialogPrime
    v-model:visible="isDeleteModalOpen"
    modal
    dismissableMask
    @update:visible="onCloseDialog"
  >
    <div class="container">
      <h2 class="text-heading">Delete this {{ deletedItem }}?</h2>
      <p>
        {{
          `Are you sure you want to delete the ${
            deletedItem === BOARD
              ? `'${selectedItem?.label}' board`
              : `${task?.title} task and its subtasks`
          }? ${
            deletedItem === BOARD
              ? 'This action will remove all columns and tasks and cannot be reversed.'
              : 'This action cannot be reversed.'
          }`
        }}
      </p>
      <div class="buttons-container">
        <ButtonPrime severity="danger" @click="onConfirmDelete">Delete</ButtonPrime>
        <ButtonPrime text @click="onCancel">Cancel</ButtonPrime>
      </div>
    </div>
  </DialogPrime>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  gap: 24px;
}

.text-heading {
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  margin: 0;
  letter-spacing: 0px;
  text-align: left;
  color: #ea5555;
}

p {
  font-size: 13px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0px;
  text-align: left;
  color: #828fa3;
  max-width: 300px;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 768px) {
  p {
    max-width: 420px;
  }
  .container {
    padding: 32px;
  }

  .buttons-container {
    flex-direction: row;
    gap: 16px;
  }

  .buttons-container > button {
    flex: 1;
  }
}
</style>
