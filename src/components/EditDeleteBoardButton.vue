<script setup lang="ts">
import { useRouter } from 'vue-router'
import { DELETE, EDIT } from '@/constants'
import { ref } from 'vue'

const router = useRouter()
const overlay = ref()

const toggleOverlay = (event: any) => {
  overlay.value.toggle(event)
}

const editBoard = () => {
  overlay.value.hide()
  router.push({
    query: {
      ...router.currentRoute.value.query,
      boardAction: EDIT
    }
  })
}

const openDeleteDialog = () => {
  overlay.value.hide()
  router.push({
    query: {
      ...router.currentRoute.value.query,
      boardAction: DELETE
    }
  })
}
</script>

<template>
  <ButtonPrime text class="icon-button" @click="toggleOverlay">
    <img src="/icons/icon-vertical-ellipsis.svg" alt="vertical-ellipses" />
  </ButtonPrime>
  <OverlayPanelPrime ref="overlay" baseZIndex="1300">
    <div class="content-overlay">
      <button text class="button-overlay" @click="editBoard">Edit Board</button>
      <button text class="button-overlay red" @click="openDeleteDialog">Delete Board</button>
    </div>
  </OverlayPanelPrime>
</template>

<style scoped>
.icon-button {
  background-color: transparent !important;
}

.content-overlay {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}
.button-overlay {
  font-size: 13px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0px;
  color: #828fa3;
  cursor: pointer;
}

.red {
  color: #ea5555;
}
</style>
