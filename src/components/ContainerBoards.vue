<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSidebar } from '@/stores'
import IconBoard from './icons/IconBoard.vue'

const storeSidebar = useSidebar()

const { selectedItem, boards } = storeToRefs(storeSidebar)

const selectItem = (item: { id: string; label: string }) => {
  storeSidebar.selectItem(item)
}
</script>

<template>
  <div class="container">
    <p class="header-boards">All boards ({{ boards.length }})</p>
    <ul class="container-boards">
      <li
        class="item-board"
        v-for="board in boards"
        v-bind:key="board.label"
        :class="{ active: selectedItem?.id === board.id }"
        @click="selectItem(board)"
      >
        <IconBoard />
        <p class="text-label">{{ board.label }}</p>
      </li>
      <li class="item-board create-button">
        <IconBoard />
        <p>+ Create New Board</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {
  gap: 12px;
  display: flex;
  align-items: center;
}

svg {
  fill: var(--text-color-secondary);
}

.header-boards,
.text-label {
  font-weight: 700;
  color: var(--text-color-secondary);
}

.container-boards {
  padding-right: 24px;
}

.header-boards {
  margin-left: 24px;
  margin-bottom: 19px;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 2.4px;
  text-transform: uppercase;
}

.text-label {
  font-size: 15px;
  line-height: 19px;
}

.item-board {
  margin: 0;
  cursor: pointer;
  padding: 15px 0 15px 24px;
  border-radius: 0 24px 24px 0;
}

.item-board:hover {
  background-color: var(--hover-item-boards);
}

.create-button {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 12px;
}

.active {
  background: var(--primary-500);
  border-radius: 0px 24px 24px 0px;
}

.active .text-label {
  color: var(--surface-0);
}

.active svg {
  fill: var(--surface-0);
}

.active:hover {
  background: var(--primary-500);
}

@media (min-width: 768px) {
  .container {
    padding-top: 30px;
  }
}

@media (min-width: 1440px) {
  .container {
    padding-top: 45px;
  }

  .header-boards {
    margin-left: 32px;
  }

  .item-board {
    padding-left: 32px;
  }
}
</style>
