<script setup lang="ts">
import { useCardDialogStore, useCategoryDialogStore } from '@/stores/dialogs'
import CardItem from '../CardItem.vue'
import { ref } from 'vue'
import CategoryHeader from './CategoryHeader.vue'
import type { Card, Category } from '@/stores/categories'
import router from '@/router'

const props = defineProps<{
  category: Category
  isPlaceholder?: boolean
}>()

const columns = ref([1, 2, 3, 4, 5])
const cardDialog = useCardDialogStore()
const categoryDialog = useCategoryDialogStore()

const onLoad = ({ done }) => {
  if (columns.value.length >= 10) return done('empty')

  const newColumns = []
  for (let i = columns.value.length; i < columns.value.length + 5; i++) {
    newColumns.push(i + 1)
  }

  columns.value = [...columns.value, ...newColumns]

  done('ok')
}

const onAddCard = () => {
  cardDialog.add(props.category.id)
}

const onEditCard = (data: Card) => {
  cardDialog.edit(data)
}

const onEditCategory = () => {
  categoryDialog.edit(props.category)
}

const onDeleteCategory = () => {
  if (props.category.cards.length) {
    return alert('Cannot delete category with cards')
  }
}

const onCardSelect = (data: Card) => {
  router.push(`/projects/${props.category.id}/cards`)
}
</script>

<template>
  <div class="container" v-if="props.isPlaceholder">
    <div
      class="h-100 d-flex align-center justify-center border-sm border-dashed border-success rounded-lg"
    >
      <v-btn
        icon="mdi-plus"
        size="x-large"
        color="green-lighten-1"
        variant="tonal"
        @click="categoryDialog.add"
      />
    </div>
  </div>
  <div class="container" v-else>
    <CategoryHeader
      :title="category.title"
      @add="onAddCard"
      @edit="onEditCategory"
      @delete="onDeleteCategory"
    />

    <!-- Cards -->
    <v-infinite-scroll
      :items="columns"
      :onLoad="onLoad"
      class="ga-8 px-2"
      color="green-darken-3"
      height="100%"
      empty-text=""
    >
      <template v-for="item in category.cards" :key="item">
        <CardItem :card="item" @edit="onEditCard(item)" @click="onCardSelect(item)" />
      </template>
    </v-infinite-scroll>
  </div>
</template>

<style lang="scss">
.container {
  min-width: 300px;
  max-width: 300px;
  height: calc(100vh - 14rem);
  display: flex;
  flex-direction: column;
  gap: 16px;

  .v-infinite-scroll__side {
    display: none;
  }
}
</style>
