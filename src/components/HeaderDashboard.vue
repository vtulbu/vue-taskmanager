<script setup lang="ts">
import { useScreenSize, useTheme, useSidebar, useBoards, useRouteListener } from '@/stores'
import { storeToRefs } from 'pinia'
import TypographyElement from './TypographyElement.vue'
import { useRouter } from 'vue-router'
import { BOARD, CREATE } from '@/constants'
import LogoMobile from './icons/LogoMobile.vue'
import LogoDark from './icons/LogoDark.vue'
import LogoLight from './icons/LogoLight.vue'
import EditDeleteButtonVue from './EditDeleteButton.vue'

const router = useRouter()
const storeTheme = useTheme()
const storeScreenSize = useScreenSize()
const storeSideBar = useSidebar()
const storeBoards = useBoards()
const storeRoute = useRouteListener()

const { isDark } = storeToRefs(storeTheme)
const { isMobile } = storeToRefs(storeScreenSize)
const { isSidebarOpen } = storeToRefs(storeSideBar)
const { selectedItem } = storeToRefs(storeBoards)
const { isTaskModalOpen, isBoardModalOpen } = storeToRefs(storeRoute)

const toggleSidebar = () => {
  isMobile.value &&
    !(isTaskModalOpen.value || isBoardModalOpen.value) &&
    storeSideBar.toggleSidebar()
}

const addTask = () => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      taskAction: CREATE
    }
  })
}
</script>

<template>
  <header :class="{ openSideBar: isSidebarOpen, closedSideBar: !isSidebarOpen }">
    <div class="left-side">
      <LogoMobile v-if="isMobile" />
      <LogoDark v-if="!isMobile && !isDark" />
      <LogoLight v-if="!isMobile && isDark" />
      <div class="divider" v-if="!isMobile" />
      <div @click="toggleSidebar" class="container-board-name">
        <TypographyElement as="h2" v-bind:text="selectedItem?.label || ''" />
        <img v-if="isMobile && !isSidebarOpen" src="/icons/icon-chevron-down.svg" alt="icon-down" />
        <img v-if="isMobile && isSidebarOpen" src="/icons/icon-chevron-up.svg" alt="icon-right" />
      </div>
    </div>
    <div class="right-side">
      <ButtonPrime
        @click="addTask"
        label="+ Add new task"
        v-bind:disabled="Boolean(!selectedItem?.columns.length)"
        class="button-header"
      >
        <img v-if="isMobile" src="/icons/icon-add-task-mobile.svg" alt="icon-search" />
      </ButtonPrime>
      <EditDeleteButtonVue v-bind:forItem="BOARD" />
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: var(--header);
  z-index: 1200;
  position: relative;
}

h1 {
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
}

.left-side,
.right-side,
.container-board-name {
  display: flex;
  align-items: center;
  gap: 16px;
}

.container-board-name:hover {
  opacity: 0.7;
}

.container-board-name {
  gap: 8px;
  cursor: pointer;
}

.divider {
  position: absolute;
  top: 0;
  left: var(--sidebar-width-tablet);
  width: 1px;
  height: var(--header-height-tablet);
  background-color: var(--lines);
}

.button-header {
  padding: 10px 18px;
}

@media (min-width: 768px) {
  header {
    padding: 16px 24px;
  }

  h1 {
    font-size: 20px;
    line-height: 25px;
  }

  .left-side,
  .right-side,
  .container-board-name {
    gap: 24px;
  }

  .container-board-name {
    margin-left: 80px;
    cursor: auto;
  }

  .container-board-name:hover {
    opacity: 1;
  }

  .button-header {
    padding: 15px 25px;
  }

  .openSideBar::before {
    content: '';
    position: absolute;
    top: var(--header-height-tablet);
    right: 0;
    width: calc(100% - var(--sidebar-width-tablet));
    height: 1px;
    background-color: var(--lines);
  }

  .closedSideBar::before {
    content: '';
    position: absolute;
    top: var(--header-height-tablet);
    right: 0;
    width: 100%;
    height: 1px;
    background-color: var(--lines);
  }
}

@media (min-width: 1440px) {
  header {
    padding: 20px 32px 28px 24px;
  }

  h1 {
    font-size: 24px;
    line-height: 30px;
  }

  .left-side,
  .right-side,
  .container-board-name {
    gap: 32px;
  }

  .container-board-name {
    margin-left: 120px;
  }

  .divider {
    height: var(--header-height-desktop);
    left: var(--sidebar-width-desktop);
  }

  .openSideBar::before {
    top: var(--header-height-desktop);
    width: calc(100% - var(--sidebar-width-desktop));
  }
  .closedSideBar::before {
    top: var(--header-height-desktop);
  }
}
</style>
