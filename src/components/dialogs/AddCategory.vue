<script setup lang="ts">
import { useCategoryStore } from '@/stores/categories'
import { useCategoryDialogStore } from '@/stores/dialogs'
import { faker } from '@faker-js/faker'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { useField, useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import { z } from 'zod'
import ConfirmDelete from './ConfirmDelete.vue'

const dialog = useCategoryDialogStore()
const categoryStore = useCategoryStore()

const { category } = storeToRefs(dialog)

const isDelete = ref(false)

const generate = () => {
  title.value.value = faker.science.chemicalElement().name
  description.value.value = faker.lorem.paragraph(2)
}

const validationSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }),
  description: z.string()
})

const { handleSubmit, handleReset } = useForm({
  validationSchema: toTypedSchema(validationSchema)
})

const title = useField('title')
const description = useField('description')

watch(category, () => {
  if (category.value) {
    title.value.value = category.value.title
    description.value.value = category.value.description
  }
})

const onClose = () => {
  handleReset()
  dialog.close()
}

const onSubmit = handleSubmit((values) => {
  if (dialog.isEditing && category.value) {
    categoryStore.edit({ ...category.value, ...values })
    return onClose()
  }
  categoryStore.add({ ...values, cards: [], id: uuid() })
  onClose()
})

const onDelete = () => {
  if (category.value) {
    categoryStore.remove(category.value.id)
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
          <span class="text-h5">Add Category</span>
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
      type="category"
      @delete="onDelete"
      @close="isDelete = false"
    />
  </v-dialog>
</template>
