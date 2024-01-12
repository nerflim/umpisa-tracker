import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Card, Category } from './categories'
import type { Project } from './projects'

export const useCardDialogStore = defineStore('cardDialog', () => {
  const category = ref('')
  const card = ref<Card | null>(null)

  const isAdding = computed(() => !!category.value)
  const isEditing = computed(() => !!card.value)

  const isVisible = computed(() => isAdding.value || isEditing.value)

  const add = (id: string) => {
    category.value = id
  }

  const edit = (data: Card) => {
    card.value = data
    category.value = data.category
  }

  const close = () => {
    category.value = ''
    card.value = null
  }

  return { add, edit, close, isAdding, isEditing, isVisible, category, card }
})

export const useCategoryDialogStore = defineStore('categoryDialog', () => {
  const isAdding = ref(false)
  const isEditing = ref(false)

  const category = ref<Category | null>(null)

  const isVisible = computed(() => isAdding.value || isEditing.value)

  const add = () => {
    isAdding.value = true
  }

  const edit = (data: Category) => {
    category.value = data
    isEditing.value = true
  }

  const close = () => {
    isAdding.value = false
    isEditing.value = false
    category.value = null
  }

  return { add, edit, close, isAdding, isEditing, category, isVisible }
})

export const useProjectDialogStore = defineStore('projectDialog', () => {
  const isAdding = ref(false)
  const isEditing = ref(false)

  const project = ref<Project | null>(null)

  const isVisible = computed(() => isAdding.value || isEditing.value)

  const add = () => {
    isAdding.value = true
  }

  const edit = (data: Project) => {
    isEditing.value = true
    project.value = data
  }

  const close = () => {
    isAdding.value = false
    isEditing.value = false
    project.value = null
  }

  return { add, close, edit, project, isEditing, isVisible }
})
