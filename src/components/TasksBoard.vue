<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useScreenSize, useSidebar } from '@/stores'

const storeSideBar = useSidebar()
const storeScreenSize = useScreenSize()

const { isSidebarOpen } = storeToRefs(storeSideBar)
const { isMobile } = storeToRefs(storeScreenSize)
</script>

<template>
  <div class="tasks-board" :class="{ openSidebar: !isMobile && isSidebarOpen }">
    <p class="empty-board-text">This board is empty. Create a new column to get started.</p>
  </div>
</template>

<style scoped>
.tasks-board {
  height: calc(100% - var(--header-height-mobile));
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  animation: closeSidebar 150ms forwards;
}

.openSidebar {
  width: calc(100% - var(--sidebar-width-tablet));
  animation: openSidebar 150ms forwards;
}

.empty-board-text {
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0px;
  text-align: center;
  color: var(--medium-grey);
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
