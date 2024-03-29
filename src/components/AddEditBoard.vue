<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoards, useRouteListener, useTheme } from '@/stores'
import { computed, reactive, watchEffect } from 'vue'
import TextFieldVue from './TextField.vue'
import TypographyElement from './TypographyElement.vue'
import IconCross from './icons/IconCross.vue'
import { EDIT } from '@/constants'
import router from '@/router'

const idForm = 'create-edit-board'

const formInput = reactive<{ name: string; columns: { id?: string; label: string }[] }>({
  name: '',
  columns: []
})
const isValid = computed(() => {
  if (formInput.columns.length) {
    return formInput.name.length > 0 && formInput.columns.every((item) => item.label.length > 0)
  }

  return formInput.name.length > 0
})

const storeBoards = useBoards()
const storeTheme = useTheme()
const storeRouteListener = useRouteListener()

const { selectedItem } = storeToRefs(storeBoards)
const { isDark } = storeToRefs(storeTheme)
const { action, isBoardModalOpen } = storeToRefs(storeRouteListener)

const createNewColumn = (e: { preventDefault: () => void }) => {
  e.preventDefault()
  formInput.columns.push({ label: '' })
}

const deleteColumn = (id: number) => {
  formInput.columns.splice(id, 1)
}

const submitForm = (e: { preventDefault: () => void }) => {
  e.preventDefault()

  if (action.value === EDIT && selectedItem.value) {
    storeBoards.updateBoard(formInput, selectedItem.value.id)
  } else {
    storeBoards.addNewBoard(formInput)
  }
  formInput.name = ''
  formInput.columns = []
}

const onUpdateName = (e: string) => {
  formInput.name = e
}

const onUpdateColumn = (e: string, index: number) => {
  formInput.columns[index].label = e
}

const onCloseDialog = () => {
  router.push({
    query: {
      boardId: selectedItem.value?.id
    }
  })

  formInput.name = ''
  formInput.columns = []
}

watchEffect(() => {
  const { boardAction } = router.currentRoute.value.query

  if (boardAction === EDIT && action.value === EDIT && selectedItem.value) {
    const { label, columns } = selectedItem.value
    formInput.name = label
    formInput.columns = columns.map((item) => ({ id: item.id, label: item.label }))
  }
})
</script>

<template>
  <DialogPrime
    v-model:visible="isBoardModalOpen"
    modal
    dismissableMask
    @update:visible="onCloseDialog"
  >
    <div class="dialog-content">
      <TypographyElement as="h4" v-bind:text="action === EDIT ? 'Edit Board' : 'Add New Board'" />
      <form :id="idForm">
        <TextFieldVue
          label-text="Board Name"
          placeholder="e.g. Web Design"
          v-bind:value="formInput.name"
          @update:value="onUpdateName"
        />
        <div class="columns">
          <label
            class="label-textfield no-margin"
            :class="{ darkLabel: isDark }"
            v-if="formInput.columns.length"
            >Board Columns</label
          >
          <div v-for="(item, index) in formInput.columns" v-bind:key="index" class="column-field">
            <TextFieldVue
              v-bind:value="item.label"
              @update:value="(e) => onUpdateColumn(e, index)"
            />
            <IconCross @click="deleteColumn(index)" />
          </div>
          <ButtonPrime
            type="submit"
            label="+ Add new column"
            text
            @click="createNewColumn"
            :class="{ darkTextButton: isDark }"
          />
        </div>
      </form>
      <ButtonPrime
        type="submit"
        v-bind:label="action === EDIT ? 'Save Changes' : 'Create New Board'"
        :form="idForm"
        @click="submitForm"
        v-bind:disabled="!isValid"
      />
    </div>
  </DialogPrime>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  width: 343px;
}

.columns {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.column-field {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

.column-field div {
  width: 100%;
}

@media (min-width: 768px) {
  .dialog-content {
    padding: 32px;
    width: 480px;
  }
}
</style>
