<script setup lang="ts">
import TypographyElement from './TypographyElement.vue'
import type { boardsMock } from '@/constants'

defineProps<{
  column: (typeof boardsMock)[0]['columns'][0]
}>()
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
      <div class="task-card" v-for="task in column.tasks" :key="task.id">
        <TypographyElement as="h4" v-bind:text="task.title" />
        <TypographyElement as="p" v-bind:text="`0 of 3 subtasks`" class="subtasks" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  width: 280px;
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
}

.subtasks {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: var(--medium-grey);
}
</style>
