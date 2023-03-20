<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoards } from '@/stores'
import SingleColumnVue from './SingleColumn.vue'

const storeBoards = useBoards()

const { selectedItem } = storeToRefs(storeBoards)
</script>

<template>
  <div class="columns-container" v-if="!!selectedItem?.columns.length">
    <SingleColumnVue
      v-for="column in selectedItem?.columns"
      :key="column.id"
      v-bind:column="column"
    />
  </div>
</template>

<style scoped>
.columns-container {
  display: flex;
  gap: 16px;
}
</style>
