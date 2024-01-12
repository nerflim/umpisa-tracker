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

export const useCategoryStore = defineStore('category', () => {
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

  const addCard = (categoryId: string, card: Card) => {
    const category = categories.value.find((item) => item.id === categoryId)

    if (category) {
      category.cards.push(card)
    }
  }

  const editCard = (categoryId: string, card: Card) => {
    const category = categories.value.find((item) => item.id === categoryId)

    if (categoryId !== card.category && category) {
      const newCategory = categories.value.find((item) => item.id === card.category)

      if (newCategory) {
        newCategory.cards.push(card)
        category.cards = category.cards.filter((item) => item.id !== card.id)
      }
    } else if (category) {
      category.cards = category.cards.map((item) => {
        if (item.id === card.id) {
          return card
        }

        return item
      })
    }
  }

  const removeCard = (categoryId: string, cardId: string) => {
    const category = categories.value.find((item) => item.id === categoryId)

    if (category) {
      category.cards = category.cards.filter((item) => item.id !== cardId)
    }
  }

  return { categories, add, edit, remove, addCard, editCard, removeCard }
})
