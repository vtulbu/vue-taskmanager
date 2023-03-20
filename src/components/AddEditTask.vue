<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoards, useRouteListener, useTheme } from '@/stores'
import { computed, reactive, watchEffect } from 'vue'
import TextFieldVue from './TextField.vue'
import TypographyElement from './TypographyElement.vue'
import IconCross from './icons/IconCross.vue'
import { EDIT } from '@/constants'

const idForm = 'create-edit-task'

const storeBoards = useBoards()
const storeTheme = useTheme()
const routeListener = useRouteListener()
const { selectedItem } = storeToRefs(storeBoards)
const { isDark } = storeToRefs(storeTheme)
const { action, isTaskModalOpen } = storeToRefs(routeListener)

const columns = computed(() => {
  return selectedItem.value?.columns.map((item) => item)
})

const formInput = reactive<{
  title: string
  description: string
  columnId: string | null
  subtasks: string[]
}>({
  title: '',
  description: '',
  columnId: null,
  subtasks: []
})

const isValid = computed(() => {
  if (formInput.title.length) {
    return formInput.title.length > 0 && formInput.subtasks.every((item) => item.length > 0)
  }

  return formInput.title.length > 0
})

const createNewColumn = (e: { preventDefault: () => void }) => {
  e.preventDefault()
  formInput.subtasks.push('')
}

const deleteColumn = (id: number) => {
  formInput.subtasks.splice(id, 1)
}

const resetForm = () => {
  formInput.title = ''
  formInput.description = ''
  formInput.columnId = null
  formInput.subtasks = []
}

const submitForm = (e: { preventDefault: () => void }) => {
  e.preventDefault()
  storeBoards.createTask(formInput)
  resetForm()
}

const onUpdateTitle = (e: string) => {
  formInput.title = e
}

const onUpdateDescription = (e: string) => {
  formInput.description = e
}

const onUpdateSubtask = (e: string, index: number) => {
  formInput.subtasks[index] = e
}

watchEffect(() => {
  if (columns.value?.length) {
    formInput.columnId = columns.value[0].id
  }
})
</script>

<template>
  <DialogPrime v-model:visible="isTaskModalOpen" modal position="top" dismissableMask>
    <div class="dialog-content">
      <TypographyElement as="h4" v-bind:text="action === EDIT ? 'Edit Task' : 'Add New Task'" />
      <form :id="idForm">
        <TextFieldVue
          label-text="Title"
          placeholder="e.g. Take coffee break"
          v-bind:value="formInput.title"
          @update:value="onUpdateTitle"
        />
        <TextFieldVue
          v-bind:textArea="{ rows: 3, cols: 5 }"
          label-text="Description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
          v-bind:value="formInput.description"
          @update:value="onUpdateDescription"
        />
        <div class="columns">
          <label
            class="label-textfield no-margin"
            :class="{ darkLabel: isDark }"
            v-if="formInput.subtasks.length"
            >Subtasks</label
          >
          <div v-for="(item, index) in formInput.subtasks" v-bind:key="index" class="column-field">
            <TextFieldVue v-bind:value="item" @update:value="(e) => onUpdateSubtask(e, index)" />
            <IconCross @click="deleteColumn(index)" />
          </div>
          <ButtonPrime
            type="submit"
            label="+ Add New Subtask"
            text
            @click="createNewColumn"
            :class="{ darkTextButton: isDark }"
          />
        </div>
        <div style="display: flex; flex-direction: column">
          <label class="label-textfield" :class="{ darkLabel: isDark }">Status</label>
          <DropdownPrime
            v-model="formInput.columnId"
            placeholder="Select a Column"
            :options="columns"
            optionLabel="label"
            optionValue="id"
            dataKey="id"
          />
        </div>
      </form>
      <ButtonPrime
        type="submit"
        v-bind:label="action === EDIT ? 'Save Changes' : 'Create New Task'"
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
