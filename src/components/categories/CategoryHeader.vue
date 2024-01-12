<script setup lang="ts">
const cardProps = defineProps({
  title: String
})

const emit = defineEmits<{
  add: []
  edit: []
  delete: []
}>()
</script>

<template>
  <v-card variant="tonal" color="green-darken-2">
    <v-card-item>
      <div class="d-flex ga-2 align-center">
        <div class="text-subtitle-1">{{ cardProps.title }}</div>

        <v-btn
          density="compact"
          icon="mdi-plus"
          variant="tonal"
          color="green-lighten-5"
          @click="emit('add')"
          class="ml-auto"
          size="small"
        />

        <v-btn
          density="compact"
          icon="mdi-dots-vertical"
          variant="plain"
          color="green-lighten-5"
          @click="emit('edit')"
          size="small"
        />
      </div>
    </v-card-item>
  </v-card>
</template>
