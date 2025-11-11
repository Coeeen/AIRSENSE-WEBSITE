<template>
  <!-- eslint-disable  -->
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    :width="200"
    :breakpoint="500"
    bordered
    style="background: #f1f1f1; overflow-x: hidden"
  >
    <div class="drawer-container">
      <div class="row col-12 q-mt-lg q-pt-md q-mb-xl">
        <q-img
          width="70%"
          src="~assets/AGdanskLogo.svg"
          alt="AGdanskLogo Logo"
          class="q-ml-lg cursor-pointer"
        />
      </div>

      <q-list>
        <template v-for="(item, index) in drawrerItems" :key="index">
          <q-item
            clickable
            dense
            @click="navigateTo(item.to)"
            style="margin-top: 10px; font-size: 14px; min-height: 48px; padding: 4px 20px"
          >
            <q-item-section side>
              <air-icon size="18px" :icon-name="getIconName(item)" :tooltip="item.name" />
            </q-item-section>
            <q-item-section style="min-width: 100px">
              {{ t(item.name) }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>

      <div class="flex-spacer"></div>

      <q-list>
        <template v-for="(item, index) in drawrerItemsExit" :key="index">
          <q-item
            clickable
            dense
            @click="
              item.name === 'dashboard.drawler.wylogowanie' ? handleLogout() : navigateTo(item.to)
            "
            style="margin-top: 10px; font-size: 14px; min-height: 48px; padding: 4px 20px"
          >
            <q-item-section side>
              <air-icon size="18px" :icon-name="getIconName(item)" :tooltip="item.name" />
            </q-item-section>
            <q-item-section style="min-width: 100px">
              {{ t(item.name) }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </div>
  </q-drawer>
</template>

<script setup>
import { drawrerItems, drawrerItemsExit } from 'src/utils/drawlerItems'
import { inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '/src/stores/AuthStore.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const { logoutCurrentUser } = useAuthStore()

const leftDrawerOpen = inject('leftDrawerOpen')
const router = useRouter()
const route = useRoute()

const navigateTo = (route) => {
  if (route) {
    router.push(route)
  }
}

const handleLogout = async () => {
  await logoutCurrentUser()
  router.push('/')
}

const getIconName = (item) => {
  return route.meta.moduleName === item.moduleName ? item.iconNameActive : item.iconName
}
</script>

<style scoped>
.drawer-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
}

.flex-spacer {
  flex-grow: 1;
}
</style>
