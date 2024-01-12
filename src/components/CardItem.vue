<script setup lang="ts">
import type { Card } from '@/stores/categories'

const { card } = defineProps<{
  card: Card
}>()

const emit = defineEmits<{
  click: []
  edit: []
}>()
</script>

<template>
  <div>
    <v-card variant="tonal" position="relative" @click="emit('click')">
      <v-card-item class="position-absolute w-100">
        <template v-slot:append>
          <v-btn
            icon="mdi-dots-vertical"
            density="compact"
            @click.stop="emit('edit')"
            variant="plain"
            size="small"
          ></v-btn>
        </template>
      </v-card-item>
      <v-card-item>
        <div>
          <div class="text-overline mb-1">ABC-001</div>
          <div class="text-h6 mb-1">{{ card.title }}</div>
          <div class="text-caption mb-8">{{ card.description }}</div>
          <div class="text-caption">Jan 01, 2024</div>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped lang="scss"></style>
