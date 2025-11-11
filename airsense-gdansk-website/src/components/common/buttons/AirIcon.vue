<template>
  <div>
    <q-icon :name="'img:' + iconURL" :size="size" style="margin-top: 2px" />
    <q-tooltip v-if="tooltip">
      {{ tooltip }}
    </q-tooltip>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'
//   const emit = defineEmits(["click"]);

const props = defineProps({
  tooltip: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '20px',
    required: false,
  },
})

const iconURL = computed(() => {
  return new URL(`/src/assets/${props.iconName}.svg`, import.meta.url).href
})
</script>

<style scoped lang="scss"></style>
