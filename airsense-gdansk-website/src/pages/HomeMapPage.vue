<template>
  <!-- HEADER -->
  <!-- <div class="q-mb-none q-pb-none q-pb-sm header" style="background-color: #0b3721">
    <div class="row items-center justify-between q-px-md q-pt-md q-pb-none text-white">
      <div>
        <img
          src="src/assets/AGdanskLogoWhite.svg"
          width="125"
          alt="AirSense Logo"
          class="q-mt-md"
          style="margin-left: 10px"
        />
      </div>

      <div class="row q-col-gutter-x-lg Inter q-mr-xl">
        <div class="cursor-pointer" @click="router.push('/')">
          {{ t('menu.stronaGlowna') }}
        </div>
        <div
          class="cursor-pointer"
          @click="toggleLanguage"
          role="button"
          aria-label="Change language"
        >
          {{ locale.toUpperCase() }}
        </div>
      </div>
      <q-btn
        class="SpaceGrotesk"
        no-shadow
        no-caps
        rounded
        style="background-color: rgba(255, 255, 255, 0.2); color: white"
        @click="loginViaAdfs"
        >{{ t('menu.loginBtn') }}</q-btn
      >
    </div>
  </div> -->
  <!-- MAP -->

  <div style="height: 100vh">
    <main-map :is-logged-in="false" :visible-date="true" />
  </div>
</template>

<script setup>
// import { useI18n } from 'vue-i18n'
// import { useRouter } from 'vue-router'
import MainMap from 'src/components/MainMap.vue'
// import { useAuthStore } from 'src/stores/AuthStore.js'
// const { loginViaAdfs } = useAuthStore()

// const { t, locale } = useI18n()
// const router = useRouter()

// const toggleLanguage = () => {
// locale.value = locale.value === 'pl' ? 'en' : 'pl'
// }
</script>
<style scoped>
.header {
  height: 70px;
}

.map-container {
  height: calc(100vh - 70px);
}
</style>
