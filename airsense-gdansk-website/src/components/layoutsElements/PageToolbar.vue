<template>
  <div style="border-radius: 20px; background-color: #ffffff" class="q-ma-sm">
    <q-toolbar>
      <q-avatar style="cursor: pointer" @click="toggleLeftDrawer">
        <img :src="user.picture" alt="profile" />
      </q-avatar>

      <div class="column q-ml-md">
        <div>{{ user.name !== null || undefined ? user.name : 'Użytkownik' }}</div>
      </div>
      <q-space />
      <!-- <div class="row justify-center items-center  q-pa-xs q-px-sm" style="background-color: #F6F6F6;;border-radius: 20px;">
        <div>
        <q-img  src="src\assets\CALENDAR_DRAWLER.svg" alt="calendar" style="height: 20px; width: 20px;" class="q-mr-sm"/>
        </div>
        <div>
          {{ new Date().toLocaleDateString("pl-PL") }}
        </div>
      </div> -->

      <q-space />
      <!-- <div class="row col-7">
        <air-select-filters
          option-label="name"
          option-value="value"
          :options="optionsCity"
          placeholder="Szukaj lokalizacji"
          :model-value="selectedCity"
          class="col-12"
          :borderless="true"
          :rounded="true"
        />
      </div> -->
      <q-space />
      <div style="padding: 5px; background-color: #f6f6f6; border-radius: 100%">
        <q-avatar style="cursor: pointer" @click="toggleLanguage">
          <q-img width="100%" height="100%" :src="languageIcon" alt="language" />
        </q-avatar>
      </div>
    </q-toolbar>
  </div>
</template>

<script setup>
//imports
import { inject, toRefs, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '/src/stores/AuthStore.js'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const { getCurrentUser } = useAuthStore()
const { user } = storeToRefs(useAuthStore())
// import AirSelectFilters from '../common/form/AirSelectFilters.vue'

//refs
const props = defineProps({
  showLeftDrawerBtn: {
    type: Boolean,
    required: false,
    default: () => true,
  },
})

const { showLeftDrawerBtn } = toRefs(props)
const leftDrawerOpen = inject('leftDrawerOpen')
console.log(showLeftDrawerBtn, 'xxx')
const languageIcon = ref(
  locale.value === 'pl'
    ? 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png'
    : 'https://media.istockphoto.com/id/1513978246/vector/united-kingdom-flag-vector-illustration-eps10.jpg?s=612x612&w=0&k=20&c=CZzB6tSqcpyzDJzMnF0xOLy3MlyvPTGHw-Y1zu62zOk=',
)

// const selectedCity = ref()
// const optionsCity = [
//   { name: 'Gdańsk Wrzeszcz', value: 0 },
//   { name: 'Gdańsk Główny', value: 1 },
//   { name: 'Gdańsk Szadółki', value: 3 },
// ]

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const toggleLanguage = () => {
  locale.value = locale.value === 'pl' ? 'en' : 'pl'
  languageIcon.value =
    locale.value === 'pl'
      ? 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png'
      : 'https://media.istockphoto.com/id/1513978246/vector/united-kingdom-flag-vector-illustration-eps10.jpg?s=612x612&w=0&k=20&c=CZzB6tSqcpyzDJzMnF0xOLy3MlyvPTGHw-Y1zu62zOk='
}

onMounted(async () => {
  await getCurrentUser()
  console.log(user.value, 'user')
})
</script>

<style scoped lang="scss"></style>
