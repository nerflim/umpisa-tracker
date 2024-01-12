<script setup lang="ts">
const { isDelete, type } = defineProps<{
  type: string
  isDelete: boolean
}>()

const emit = defineEmits<{
  delete: []
  close: []
}>()
</script>
<template>
  <!-- Delete Dialog -->
  <v-dialog :model-value="isDelete" width="auto">
    <v-card class="pa-4">
      <v-card-title class="mb-4">
        <span>Confirm Delete</span>
        <div class="text-caption">Are you sure you want to delete this {{ type }}?</div>
      </v-card-title>
      <v-card-actions>
        <v-btn color="red-darken-4" variant="text" @click="emit('close')">Close</v-btn>
        <v-spacer />
        <v-btn color="red-darken-4" variant="tonal" @click="emit('delete')">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
