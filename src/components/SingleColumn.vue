<script setup lang="ts">
import { useRouter } from 'vue-router'
import TypographyElement from './TypographyElement.vue'
import { VIEW, type boardsMock } from '@/constants'
import { useBoards } from '@/stores'
import { storeToRefs } from 'pinia'

const router = useRouter()
const storeBoards = useBoards()
const refsStore = storeToRefs(storeBoards)

const props = defineProps<{
  column: (typeof boardsMock)[0]['columns'][0]
}>()

const openTask = (taskId: string, columnId: string) => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      taskId,
      columnId,
      taskAction: VIEW
    }
  })
}

const handleStartDrag = (
  event: any,
  task: (typeof props)['column']['tasks'][number],
  columnId: string
) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('taskId', task.id)
  event.dataTransfer.setData('columnId', columnId)
}

const onDropInTheSameColumn = (event: any, columnId: string, index: number) => {
  event.preventDefault()
  const taskId = event.dataTransfer.getData('taskId')

  storeBoards.updateTaskInColumnDrag(columnId, taskId, index)
}
</script>

<template>
  <div class="column">
    <div class="column-name">
      <!-- <span class="column-color"> te</span> -->
      <TypographyElement
        as="h5"
        v-bind:text="`${column.label} (${column.tasks.length})`"
        class="uppercase"
      />
    </div>

    <div class="container-cards">
      <div
        :id="task.id"
        draggable="true"
        class="task-card"
        v-for="(task, index) in column.tasks"
        :key="task.id"
        @click="openTask(task.id, column.id)"
        @dragstart="handleStartDrag($event, task, column.id)"
        @dragover.prevent
        @drop="onDropInTheSameColumn($event, column.id, index)"
      >
        <TypographyElement as="h4" v-bind:text="task.title" />
        <TypographyElement
          as="p"
          v-bind:text="`${task.subtasks.filter((s) => s.isDone).length} of ${
            task.subtasks.length
          } subtasks`"
          class="subtasks"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  width: 280px;
  min-width: 280px;
  margin: 0 16px;
}

.column-name {
  display: flex;
  align-items: center;
  margin: 24px 0;
}

.column-color {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary);
  margin-right: 8px;
}

.container-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.task-card {
  background-color: var(--header);
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
  border-radius: 8px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: all 150ms ease-in-out;
}

.task-card:hover {
  background-color: var(--hover-card);
  transform: scale(1.02);
}

.subtasks {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: var(--medium-grey);
}
</style>
