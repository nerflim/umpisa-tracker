<script setup lang="ts">
import { useProjectDialogStore } from '@/stores/dialogs'
import { faker } from '@faker-js/faker'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { useProjectStore } from '@/stores/projects'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import ConfirmDelete from './ConfirmDelete.vue'

const dialog = useProjectDialogStore()
const projectStore = useProjectStore()

const { project } = storeToRefs(dialog)

const isDelete = ref(false)

const generate = () => {
  title.value.value = faker.person.jobTitle()
  shortName.value.value = faker.string.alpha(3).toUpperCase()
  description.value.value = faker.lorem.paragraph(2)
}

const validationSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }),
  shortName: z
    .string({
      required_error: 'Short name is required'
    })
    .min(3)
    .max(3),
  description: z.string()
})

const { handleSubmit, handleReset } = useForm({
  validationSchema: toTypedSchema(validationSchema)
})

const title = useField('title')
const shortName = useField('shortName')
const description = useField('description')

watch(project, () => {
  if (project.value) {
    title.value.value = project.value.title
    shortName.value.value = project.value.shortName
    description.value.value = project.value.description
  }
})

const onClose = () => {
  handleReset()
  dialog.close()
}

const onSubmit = handleSubmit((values) => {
  if (dialog.isEditing && project.value) {
    projectStore.edit({ ...project.value, ...values })
    return onClose()
  }
  projectStore.add({ ...values, id: uuid() })
  onClose()
})

const onDelete = () => {
  if (project.value) {
    projectStore.remove(project.value.id)
    isDelete.value = false
    onClose()
  }
}
</script>

<template>
  <v-dialog v-model="dialog.isVisible" width="70%" persistent>
    <v-card>
      <v-form @submit.prevent="onSubmit">
        <v-card-title class="pt-4 d-flex justify-space-between">
          <span class="text-h5">Create Project</span>
          <v-btn @click="generate">Generate data</v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Title"
                  v-model="title.value.value"
                  :error-messages="title.errorMessage.value"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="3 Letter Short Name"
                  v-model="shortName.value.value"
                  :error-messages="shortName.errorMessage.value"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Description" v-model="description.value.value"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-btn
            color="red-darken-4"
            variant="tonal"
            @click="isDelete = true"
            v-if="dialog.isEditing"
          >
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-2" variant="text" @click="onClose">Close</v-btn>
          <v-btn color="green-darken-2" variant="tonal" type="submit">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <!-- Delete Dialog -->
    <confirm-delete
      :is-delete="isDelete"
      type="project"
      @delete="onDelete"
      @close="isDelete = false"
    />
  </v-dialog>
</template>
