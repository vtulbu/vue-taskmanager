<script setup lang="ts">
import { useScreenSize, useTheme, useSidebar } from '@/stores'
import { storeToRefs } from 'pinia'

const storeTheme = useTheme()
const storeScreenSize = useScreenSize()
const storeSideBar = useSidebar()

const { isDark } = storeToRefs(storeTheme)
const { isMobile } = storeToRefs(storeScreenSize)
const { isSidebarOpen, selectedItem } = storeToRefs(storeSideBar)

const toggleSidebar = () => {
  isMobile.value && storeSideBar.toggleSidebar()
}

const toggleTheme = () => {
  storeTheme.toggleTheme()
}
</script>

<template>
  <header :class="{ openSideBar: isSidebarOpen, closedSideBar: !isSidebarOpen }">
    <div class="left-side">
      <img v-if="isMobile" src="/icons/logo-mobile.svg" alt="logo" />
      <img v-if="!isMobile && isDark" src="/icons/logo-light.svg" alt="logo" />
      <img v-if="!isMobile && !isDark" src="/icons/logo-dark.svg" alt="logo" />
      <div class="divider" v-if="!isMobile" />
      <div @click="toggleSidebar" class="container-board-name">
        <h1>{{ selectedItem?.label }}</h1>
        <img v-if="isMobile && !isSidebarOpen" src="/icons/icon-chevron-down.svg" alt="icon-down" />
        <img v-if="isMobile && isSidebarOpen" src="/icons/icon-chevron-up.svg" alt="icon-right" />
      </div>
    </div>
    <div class="right-side">
      <ButtonPrime @click="toggleTheme" label="+ Add new task" disabled>
        <img v-if="isMobile" src="/icons/icon-add-task-mobile.svg" alt="icon-search" />
      </ButtonPrime>
      <img src="/icons/icon-vertical-ellipsis.svg" alt="vertical-ellipses" />
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
  height: 84px;
  background-color: var(--lines);
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

  .openSideBar::before {
    content: '';
    position: absolute;
    top: 84px;
    right: 0;
    width: calc(100% - var(--sidebar-width-tablet));
    height: 1px;
    background-color: var(--lines);
  }

  .closedSideBar::before {
    content: '';
    position: absolute;
    top: 84px;
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
    height: 110px;
    left: var(--sidebar-width-desktop);
  }

  .openSideBar::before {
    top: 110px;
    width: calc(100% - var(--sidebar-width-desktop));
  }
  .closedSideBar::before {
    top: 110px;
  }
}
</style>
