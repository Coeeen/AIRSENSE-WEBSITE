<template>
  <div style="height: 100vh">
    <main-map :visible-date="true" :is-logged-in="true" />
  </div>
</template>

<script setup>
import MainMap from 'src/components/MainMap.vue'
</script>
