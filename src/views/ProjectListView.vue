<script setup lang="ts">
import AddProject from '@/components/dialogs/AddProject.vue'
import ProjectItem from '@/components/projects/ProjectItem.vue'
import router from '@/router'
import { useProjectDialogStore } from '@/stores/dialogs'
import { useProjectStore, type Project } from '@/stores/projects'

const dialog = useProjectDialogStore()
const projectStore = useProjectStore()

const breadcrumbs = [
  {
    title: 'Projects',
    disabled: false,
    href: '/projects'
  }
]

const onSelectProject = (project: Project) => {
  projectStore.setActive(project)
  router.push(`/projects/${project.shortName}`)
}

const onEditProject = (project: Project) => {
  dialog.edit(project)
}
</script>

<template>
  <v-breadcrumbs :items="breadcrumbs" color="green-lighten-1"></v-breadcrumbs>

  <div class="d-flex justify-end mb-8">
    <v-btn @click="dialog.add">Create Project</v-btn>
  </div>

  <main>
    <v-data-iterator :items="projectStore.projects" class="d-flex flex-column ga-8">
      <template v-slot:default="{ items }">
        <template v-for="item in items" :key="item.id">
          <ProjectItem
            :project="item.raw"
            :onClick="() => onSelectProject(item.raw)"
            :onEdit="() => onEditProject(item.raw)"
          />
        </template>
      </template>
    </v-data-iterator>
  </main>

  <AddProject />
</template>
