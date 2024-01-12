import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Project = {
  id: string
  title: string
  shortName: string
  description: string
}

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([])
  const activeProject = ref<Project | null>(null)

  const add = (data: Project) => {
    projects.value.push(data)
  }

  const edit = (data: Project) => {
    const project = projects.value.find((c) => c.id === data.id)

    if (project) {
      project.title = data.title
      project.shortName = data.shortName
      project.description = data.description
    }
  }

  const remove = (data: string) => {
    projects.value = projects.value.filter((c) => c.id !== data)
  }

  const setActive = (data: Project) => {
    activeProject.value = data
  }

  return { projects, add, setActive, activeProject, edit, remove }
})
