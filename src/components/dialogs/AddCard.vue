<script setup lang="ts">
import { useCategoryStore } from '@/stores/categories'
import { useCardDialogStore } from '@/stores/dialogs'
import { faker } from '@faker-js/faker'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { v4 as uuid } from 'uuid'
import { useField, useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import { z } from 'zod'
import ConfirmDelete from './ConfirmDelete.vue'

const dialog = useCardDialogStore()
const categoryStore = useCategoryStore()

const { category, card } = storeToRefs(dialog)

const isDelete = ref(false)

const generate = () => {
  titleField.value.value = faker.person.fullName()
  descriptionField.value.value = faker.lorem.paragraph(2)
}

const validationSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }),
  description: z.string({
    required_error: 'Description is required'
  }),
  category: z.string({
    required_error: 'Category is required'
  })
})

const { handleSubmit, handleReset } = useForm({
  validationSchema: toTypedSchema(validationSchema)
})

const titleField = useField('title')
const descriptionField = useField('description')
const categoryField = useField('category')

const onClose = () => {
  handleReset()
  dialog.close()
}

watch(category, () => {
  if (category.value) {
    categoryField.setValue(dialog.category) // this should be passed from the dialog
  }
})

watch(card, () => {
  if (card.value) {
    titleField.setValue(card.value.title)
    descriptionField.setValue(card.value.description)
  }
})

const onSubmit = handleSubmit((values) => {
  if (dialog.isEditing && card.value) {
    categoryStore.editCard(dialog.category, { ...card.value, ...values })
    return onClose()
  }
  categoryStore.addCard(values.category, { ...values, id: uuid() })
  onClose()
})

const onDelete = () => {
  if (dialog.isEditing && card.value) {
    categoryStore.removeCard(dialog.category, card.value.id)
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
          <span class="text-h5">Add Card</span>
          <v-btn @click="generate">Generate data</v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Title"
                  v-model="titleField.value.value"
                  :error-messages="titleField.errorMessage.value"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  v-model="descriptionField.value.value"
                  :error-messages="descriptionField.errorMessage.value"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="categoryStore.categories"
                  item-value="id"
                  label="Category"
                  v-model="categoryField.value.value"
                  :error-messages="categoryField.errorMessage.value"
                ></v-select>
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
      type="card"
      @delete="onDelete"
      @close="isDelete = false"
    />
  </v-dialog>
</template>
