<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoards } from '@/stores'
import SingleColumnVue from './SingleColumn.vue'

const storeBoards = useBoards()

const { selectedItem } = storeToRefs(storeBoards)

const onDrop = (event: any, columnId: string) => {
  event.preventDefault()
  const taskId = event.dataTransfer.getData('taskId')
  const fromColumnId = event.dataTransfer.getData('columnId')
  event.dataTransfer.clearData()

  const isTheSameColumn = fromColumnId === columnId

  if (isTheSameColumn) {
    return
  }
  storeBoards.updateTaskColumnDrag(fromColumnId, columnId, taskId)
}
</script>

<template>
  <div class="columns-container" v-if="!!selectedItem?.columns.length">
    <SingleColumnVue
      v-for="column in selectedItem?.columns"
      :key="column.id"
      v-bind:column="column"
      @dragenter.prevent
      @dragover.prevent
      @drop="onDrop($event, column.id)"
    />
  </div>
</template>

<style scoped>
.columns-container {
  display: flex;
  gap: 16px;
}
</style>
