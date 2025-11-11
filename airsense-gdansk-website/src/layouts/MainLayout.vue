<template>
  <q-layout view="hHh Lpr lff" style="background-color: #e1e1e1">
    <page-drawler />
    <q-page-container>
      <div class="q-pa-md">
        <page-toolbar />
        <router-view />
      </div>
    </q-page-container>

    <!-- <img
      src="~assets/img/AIRSENSE_WHITE.svg"
      alt="AIRSENSE Logo"
      class="fixed-image"
    /> -->
  </q-layout>
</template>

<script setup>
import { provide, ref } from 'vue'
import PageDrawler from 'src/components/layoutsElements/PageDrawler.vue'
import PageToolbar from 'src/components/layoutsElements/PageToolbar.vue'

const leftDrawerOpen = ref(true)
provide('leftDrawerOpen', leftDrawerOpen)
</script>
