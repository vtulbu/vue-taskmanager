<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoards, useRouteListener } from '@/stores'
import router from '@/router'

const storeBoards = useBoards()
const storeRouteListener = useRouteListener()

const { selectedItem } = storeToRefs(storeBoards)
const { isDeleteBoardModalOpen } = storeToRefs(storeRouteListener)

const onCloseDialog = () => {
  router.push({
    query: {
      boardId: selectedItem.value?.id
    }
  })
}

const onConfirmDeleteBoard = () => {
  if (selectedItem.value) {
    storeBoards.deleteBoard(selectedItem.value.id)
  }

  router.push({
    query: {
      boardId: selectedItem.value?.id
    }
  })
}

const onCancel = () => {
  router.push({
    query: {
      boardId: selectedItem.value?.id
    }
  })
}
</script>

<template>
  <DialogPrime
    v-model:visible="isDeleteBoardModalOpen"
    modal
    dismissableMask
    @update:visible="onCloseDialog"
  >
    <div class="container">
      <h2 class="text-heading">Delete this board?</h2>
      <p>
        Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all
        columns and tasks and cannot be reversed.
      </p>
      <div class="buttons-container">
        <ButtonPrime severity="danger" @click="onConfirmDeleteBoard">Delete</ButtonPrime>
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
