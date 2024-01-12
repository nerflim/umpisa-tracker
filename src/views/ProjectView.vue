<script setup lang="ts">
import AddCategory from '@/components/dialogs/AddCategory.vue'
import CategoryItem from '../components/categories/CategoryItem.vue'
import SearchBar from '../components/SearchBar.vue'
import AddCard from '../components/dialogs/AddCard.vue'
import { useCategoryStore, type Category } from '@/stores/categories'
import { useProjectStore } from '@/stores/projects'

const categoryStore = useCategoryStore()
const projectStore = useProjectStore()

const items = [
  {
    title: 'Projects',
    disabled: false,
    to: '/projects'
  },
  {
    title: `${projectStore.activeProject?.title} - ${projectStore.activeProject?.shortName}`,
    disabled: false,
    to: `/projects/${projectStore.activeProject?.shortName}`
  }
]
</script>
<template>
  <div>
    <v-breadcrumbs :items="items" color="green-lighten-1"></v-breadcrumbs>

    <main>
      <SearchBar />

      <div class="d-flex ga-8 pb-4 overflow-x-auto">
        <CategoryItem
          v-for="category in categoryStore.categories"
          :key="category.id"
          :category="category"
        />
        <CategoryItem is-placeholder :category="{} as Category" />
      </div>
    </main>

    <AddCard />
    <AddCategory />
  </div>
</template>
