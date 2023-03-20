<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useScreenSize, useSidebar } from '@/stores'
import NoColumns from './NoColumns.vue'
import BoardColumns from './BoardColumns.vue'

const storeSideBar = useSidebar()
const storeScreenSize = useScreenSize()

const { isSidebarOpen } = storeToRefs(storeSideBar)
const { isMobile } = storeToRefs(storeScreenSize)
</script>

<template>
  <div class="tasks-board" :class="{ openSidebar: !isMobile && isSidebarOpen }">
    <NoColumns />
    <BoardColumns />
  </div>
</template>

<style scoped>
.tasks-board {
  height: calc(100% - var(--header-height-mobile));
  width: 100%;
  position: absolute;
  right: 0;
  animation: closeSidebar 300ms ease;
}

.openSidebar {
  width: calc(100% - var(--sidebar-width-tablet));
  animation: openSidebar 300ms ease;
}

@media (min-width: 768px) {
  .tasks-board {
    height: calc(100% - var(--header-height-tablet));
  }

  @keyframes openSidebar {
    from {
      width: 100%;
    }
    to {
      width: calc(100% - var(--sidebar-width-tablet));
    }
  }

  @keyframes closeSidebar {
    from {
      width: calc(100% - var(--sidebar-width-tablet));
    }
    to {
      width: 100%;
    }
  }
}

@media (min-width: 1440px) {
  .tasks-board {
    height: calc(100% - var(--header-height-desktop));
  }

  @keyframes openSidebar {
    from {
      width: 100%;
    }
    to {
      width: calc(100% - var(--sidebar-width-desktop));
    }
  }

  @keyframes closeSidebar {
    from {
      width: calc(100% - var(--sidebar-width-desktop));
    }
    to {
      width: 100%;
    }
  }
}
</style>
