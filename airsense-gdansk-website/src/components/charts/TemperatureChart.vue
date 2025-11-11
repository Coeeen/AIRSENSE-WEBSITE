<template>
  <div>
    <vue-apex-charts
      :type="props.type"
      :height="props.height"
      :options="props.options"
      :series="props.series"
    />
  </div>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  type: {
    type: String,
    default: 'line',
  },
  series: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  height: {
    type: String,
    default: '350',
  },
})
</script>
