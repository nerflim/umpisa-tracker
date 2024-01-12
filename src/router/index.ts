import { createRouter, createWebHistory } from 'vue-router'
import ProjectView from '@/views/ProjectView.vue'
import ProjectListView from '@/views/ProjectListView.vue'
import CardView from '@/views/CardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/projects',
      name: 'projects',
      component: ProjectListView
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: ProjectView
    },
    {
      path: '/projects/:id/:cardId',
      name: 'card',
      component: CardView
    }
  ]
})

export default router
