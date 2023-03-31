<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BOARD, DELETE, EDIT, TASK } from '@/constants'
import { ref } from 'vue'
import IconVerticalEllipsisVue from './icons/IconVerticalEllipsis.vue'

const props = defineProps<{
  forItem: typeof TASK | typeof BOARD
}>()

const router = useRouter()
const overlay = ref()

const toggleOverlay = (event: any) => {
  overlay.value.toggle(event)
}

const onEditClick = () => {
  overlay.value.hide()

  if (props.forItem === TASK) {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        taskAction: EDIT
      }
    })
    return
  }

  router.push({
    query: {
      boardId: router.currentRoute.value.query.boardId,
      boardAction: EDIT
    }
  })
}

const openDeleteDialog = () => {
  overlay.value.hide()

  if (props.forItem === TASK) {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        taskAction: DELETE
      }
    })

    return
  }
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
    <IconVerticalEllipsisVue />
  </ButtonPrime>
  <OverlayPanelPrime ref="overlay" v-bind:baseZIndex="1300">
    <div class="content-overlay">
      <button text class="button-overlay" @click="onEditClick">Edit {{ props.forItem }}</button>
      <button text class="button-overlay red" @click="openDeleteDialog">
        Delete {{ props.forItem }}
      </button>
    </div>
  </OverlayPanelPrime>
</template>

<style scoped>
.icon-button {
  background-color: transparent !important;
  padding: 0 !important;
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
