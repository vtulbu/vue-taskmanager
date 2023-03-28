<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoards, useRouteListener } from '@/stores'
import router from '@/router'
import { computed, ref } from 'vue'
import EditDeleteButtonVue from './EditDeleteButton.vue'
import { TASK } from '@/constants'
import TaskStatus from './TaskStatus.vue'

const storeBoards = useBoards()
const routeListener = useRouteListener()
const { selectedItem } = storeToRefs(storeBoards)
const { isViewTaskModalOpen } = storeToRefs(routeListener)

const onCloseDialog = () => {
  router.push({
    query: {
      boardId: selectedItem.value?.id
    }
  })
}

const column = computed(() => {
  const { columnId } = router.currentRoute.value.query
  return selectedItem.value?.columns.find((column) => column.id === columnId)
})

const selectedTask = computed(() => {
  const { columnId, taskId } = router.currentRoute.value.query
  const column = selectedItem.value?.columns.find((column) => column.id === columnId)

  const task = column?.tasks.find((task) => task.id === taskId)
  const numOfSubtasks = task?.subtasks.length
  const numOfCompleteSubtasks = task?.subtasks.filter((subtask) => subtask.isDone).length

  return {
    task,
    numOfSubtasks,
    numOfCompleteSubtasks
  }
})

const onUpdateStatus = (value: string) => {
  storeBoards.updateTaskStatus(value)

  router.push({
    query: {
      ...router.currentRoute.value.query,
      columnId: value
    }
  })
}

const checkedSubtasks = computed({
  get: () => {
    return selectedTask.value?.task?.subtasks
      .filter((subtask) => subtask.isDone)
      .map((subtask) => subtask.id)
  },
  set: (value) => {
    storeBoards.updateSubtaskStatus(value)
  }
})
</script>

<template>
  <DialogPrime
    v-model:visible="isViewTaskModalOpen"
    modal
    dismissableMask
    @update:visible="onCloseDialog"
  >
    <div class="container">
      <div class="heading-modal">
        <h2>
          {{ selectedTask.task?.title }}
        </h2>
        <EditDeleteButtonVue v-bind:forItem="TASK" />
      </div>
      <p class="description">{{ selectedTask?.task?.description }}</p>

      <div class="subtasks-container">
        <p class="subtask-status">
          Subtasks ({{ `${selectedTask.numOfCompleteSubtasks} of ${selectedTask.numOfSubtasks}` }})
        </p>
        <div v-for="subtask in selectedTask.task?.subtasks" :key="subtask.id" class="subtask">
          <CheckboxPrime
            v-model="checkedSubtasks"
            :inputId="subtask.id"
            :value="subtask.id"
            name="subtask"
          />
          <label :for="subtask.id" class="label-subtask" :class="{ checked: subtask.isDone }">{{
            subtask.label
          }}</label>
        </div>
      </div>
      <TaskStatus
        label="Current Status"
        v-bind:value="column?.id || ''"
        @update:value="onUpdateStatus"
      />
    </div>
  </DialogPrime>
</template>

<style scoped>
h2 {
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0px;
  text-align: left;
  margin: 0;
  color: var(--text-color-theme);
}

.description {
  font-size: 13px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0px;
  text-align: left;
  color: var(--medium-grey);
  max-width: 420px;
  min-width: 340px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
}

.heading-modal {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subtask-status {
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  color: var(--text-color-theme);
}

.subtasks-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.subtask {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 8px;
  background-color: var(--background-theme);
  border-radius: 4px;
}

.label-subtask {
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  color: var(--text-color-theme);
}

.checked {
  text-decoration: line-through;
  color: var(--medium-grey);
}

@media (min-width: 768px) {
  .container {
    padding: 32px;
  }
}
</style>
