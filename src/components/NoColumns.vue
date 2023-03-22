<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoards } from '@/stores'
import { useRouter } from 'vue-router'
import { EDIT } from '@/constants'

const router = useRouter()
const storeBoards = useBoards()
const { selectedItem } = storeToRefs(storeBoards)

const openCreateColumnModal = () => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      boardAction: EDIT
    }
  })
}
</script>

<template>
  <div class="no-columns" v-if="!selectedItem?.columns.length">
    <p class="empty-board-text">This board is empty. Create a new column to get started.</p>
    <ButtonPrime @click="openCreateColumnModal" label="+ Add new column" />
  </div>
</template>

<style scoped>
.no-columns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 32px;
  align-items: center;
}

.empty-board-text {
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0px;
  text-align: center;
  color: var(--medium-grey);
}
</style>
