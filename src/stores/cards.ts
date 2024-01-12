import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Category = {
  id: string
  title: string
  description: string
  cards: any[]
}

export type Card = {
  id: string
  title: string
  description: string
  category: string
}

export const useCardStore = defineStore('card', () => {
  const categories = ref<Category[]>([])

  const add = (data: Category) => {
    categories.value.push(data)
  }

  const edit = (data: Category) => {
    const category = categories.value.find((item) => item.id === data.id)

    if (category) {
      category.title = data.title
      category.description = data.description
    }
  }

  const remove = (data: string) => {
    categories.value = categories.value.filter((item) => item.id !== data)
  }

  return { categories, add, edit, remove, addCard, editCard, removeCard }
})
