<script setup lang="ts">
import type { Project } from '@/stores/projects'

const { project } = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  click: []
  edit: []
}>()
</script>

<template>
  <v-card @click="emit('click')">
    <v-card-item class="position-absolute w-100">
      <template v-slot:append>
        <v-btn
          icon="mdi-dots-vertical"
          density="compact"
          @click.stop="emit('edit')"
          variant="plain"
        ></v-btn>
      </template>
    </v-card-item>
    <v-card-item>
      <div>
        <div class="text-overline mb-1">{{ project.shortName }}</div>
        <div class="text-h6 mb-1">{{ project.title }}</div>
        <div class="text-caption">{{ project.description }}</div>
      </div>
    </v-card-item>
  </v-card>
</template>
