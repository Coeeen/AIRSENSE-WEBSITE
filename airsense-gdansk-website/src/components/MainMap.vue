<template>
  <!-- eslint-disable  -->
  <l-map
    ref="map"
    v-model:zoom="zoom"
    :bounds="bounds"
    :use-global-leaflet="false"
    :center="center"
    style="height: 100%; width: 100%; position: relative; overflow: hidden"
    :style="visibleDate ? '' : 'border-radius: 20px'"
    @ready="onMapReady"
    @update:center="centerUpdate"
    @update:zoom="zoomUpdate"
    @click="handleMapClick"
    @moveend="handleMoveEnd"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    ></l-tile-layer>

    <l-marker :lat-lng="clickedLatLng" v-if="props.isLoggedIn && clickedLatLng">
      <l-popup class="q-pa-md bg-white" style="border-radius: 5px">
        {{ t('mainMap.clickedHere') }}
      </l-popup>
    </l-marker>

    <div :key="markerKey">
      <l-marker
        v-for="location in locations"
        :key="location.id"
        :lat-lng="[parseFloat(location.lat), parseFloat(location.lng)]"
      >
        <l-popup>
          <div
            style="
              background-color: white;
              min-height: 200px;
              min-width: 300px;
              overflow: hidden;
              padding: 12px;
              border-radius: 10px;
              background-image: url('/src/assets/LOCATION.png');
              background-size: cover;
              background-position: center;
              border-radius: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 1);
              color: white;
            "
          >
            <div
              style="font-size: 15px; font-weight: bold; letter-spacing: 1px; margin-bottom: 5px"
            >
              {{ location.name ? location.name : '' }} {{ location.lat ? location.lat : '' }}
              {{ location.lng ? location.lng : '' }}
            </div>
            <div
              style="font-size: 15px; font-weight: bold; letter-spacing: 1px; margin-bottom: 5px"
            ></div>
          </div>
        </l-popup>
      </l-marker>
    </div>

    <l-circle
      v-for="(point, index) in dangerousStinksArea || []"
      :key="index"
      :lat-lng="[point.lat, point.lng]"
      :radius="getRadius(point.value)"
      :color="getColor(point.type, point.value)"
      :fill-color="getColor(point.type, point.value)"
      :fill-opacity="0.5"
    >
      <l-popup
        :style="{
          backgroundImage: getPopupBackgroundImage(point.value, point.type),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '0px',
          margin: '0px',
          borderRadius: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 1)',
        }"
      >
        <div style="min-height: 200px; min-width: 300px; padding: 12px; color: white">
          <div style="font-size: 15px; font-weight: bold; letter-spacing: 2px; margin-bottom: 5px">
            {{ point.type.toUpperCase() }}
          </div>
          <div style="font-size: 32px; font-weight: bold; opacity: 0.9">
            {{ point.value.toFixed(2) }}
          </div>
        </div>
      </l-popup>
    </l-circle>
  </l-map>

  <div
    v-if="props.visibleDate"
    class="side-panel"
    :class="{ 'side-panel-visible': isPanelVisible }"
  >
    <div class="panel-content">
      <div style="font-size: 45px; text-align: center">
        <img
          @click="route.name === 'map-page' ? router.push('/') : console.log('')"
          src="/images/AGdanskLogoWhite.svg"
          width="225px"
          alt="AirSense Logo"
          class="q-mt-md cursor-pointer"
          style="margin-left: 10px"
        />
        <q-tooltip> {{ t('mainMap.powrot') }}</q-tooltip>
      </div>
      <air-icon
        v-if="props.visibleDate"
        btn-type="square"
        icon-name="CLOSE"
        @click="togglePanel"
        class="cursor-pointer"
        style="position: absolute; top: 10px; right: 10px; filter: brightness(0) invert(1)"
      />
      <div>
        <div class="col-12 row justify-center q-col-gutter-x-sm q-mt-xl">
          <div class="col-12 text-white text-center" style="font-size: 20px">
            {{ t('mainMap.selectLanguage') }}
          </div>
          <div
            class="flag-btn"
            :class="{ active: currentLang === 'pl' }"
            @click="toggleLanguage('pl')"
            title="Polski"
          ></div>
          <div
            class="flag-btn"
            :class="{ active: currentLang === 'en' }"
            @click="toggleLanguage('en')"
            title="English"
          ></div>
        </div>
        <div class="col-12 text-center q-mt-xl text-white" style="font-size: 20px">
          {{ t('mainMap.selectRange') }}
        </div>
        <div class="row col-12 justify-center">
          <air-input-date-map
            v-model="date.start"
            :placeholder="t('mainMap.dateFrom')"
            :label="t('mainMap.dateFrom')"
            style="opacity: 1"
          />
          <!-- <air-input-date-map
            v-model="date.end"
            :placeholder="t('mainMap.dateTo')"
            :label="t('mainMap.dateTo')"
            style="opacity: 1"
            class="q-mt-sm"
          /> -->
        </div>
        <div class="col-12 text-center q-mt-xl q-mb-sm text-white" style="font-size: 20px">
          {{ t('mainMap.selectWeatherParameters') }}
        </div>
        <div class="row col-12">
          <air-btn
            v-for="button in buttons"
            :key="button.id"
            :title="button.name"
            :tooltip="button.tooltip"
            @click="handleActive(button)"
            class="cursor-pointer q-mx-sm q-pa-xs row justify-center items-center text-center shadow-1 rounded-borders q-mt-sm"
            :class="button.class ? button.class : 'col-5'"
            style="border-radius: 20px"
            :style="{
              backgroundColor: button.active ? '#06d2a1' : '#29323d',
              color: button.active ? 'white' : 'white',
            }"
          />
        </div>
        <!-- <div class="col-12 column">
          <q-btn
            class=" q-mb-md bg bg-white"
            :label="t('mainMap.apply')"
            style="width: 100%; color: black"
          />
        </div> -->
      </div>
    </div>
  </div>
  <!-- eslint-disable-next-line -->
  <div
    v-if="props.visibleDate"
    class="column justify-center items-center q-pa-md q-col-gutter-x-xs"
    style="
      border-radius: 20px;
      position: absolute;

      right: 15px;
      z-index: 1000;
      opacity: 90%;
    "
    :style="route.name === 'map-page' ? 'top: 20px;' : 'top: 90px;'"
    @click="togglePanel"
  >
    <div
      class="row justify-center items-center q-pa-sm rounded-borders cursor-pointer"
      style="background-color: #000"
    >
      <q-icon name="menu" color="white" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { LMap, LTileLayer, LMarker, LCircle, LPopup } from '@vue-leaflet/vue-leaflet'
import { useMapStore } from '/src/stores/MapStore'
import { useLocationStore } from 'src/stores/LocationStore'
import 'leaflet/dist/leaflet.css'
import moment from 'moment'

import { useRouter, useRoute } from 'vue-router'
const { t, locale } = useI18n()
// import BAD from 'src/assets/BAD.png'

const { getMeasurementArea } = useMapStore()
const { getAllocations } = useLocationStore()

import AirInputDateMap from 'src/components/common/form/AirInputDateMap.vue'
import AirBtn from 'src/components/common/buttons/AirBtn.vue'

const zoom = ref(15)
const center = ref([54.35205, 18.64637])
const bounds = ref(null)
const router = useRouter()
const route = useRoute()
const currentLang = ref('pl')
const locations = ref()
const map = ref(null)
const dangerousStinksArea = ref()
const selectedButtons = ref(['stink'])
const isPanelVisible = ref(false)
const markerKey = ref(0)
const date = ref({
  start: moment().format('YYYY-MM-DD'),
  end: moment().format('YYYY-MM-DD'),
})

const emit = defineEmits(['onMapClick'])

const handleMapClick = (event) => {
  emit('onMapClick', [event.latlng.lat, event.latlng.lng])
}

const props = defineProps({
  visibleDate: {
    type: Boolean,
    required: true,
    default: false,
  },
  clickedLatLng: {
    required: false,
    default: false,
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const onMapReady = (leafletMapInstance) => {
  bounds.value = leafletMapInstance.getBounds()
  map.value = { leafletObject: leafletMapInstance }
  console.log('Map is ready:', leafletMapInstance)
}

const getRadius = (value) => {
  return 100 + value * 80
}

const toggleLanguage = (lang) => {
  locale.value = lang
  currentLang.value = lang
}

const togglePanel = () => {
  isPanelVisible.value = !isPanelVisible.value
}

const getColor = (type, value) => {
  console.log(type, value)
  const thresholds = {
    pm25: { low: 12, medium: 35, high: 55 },
    pm10: { low: 50, medium: 150, high: 250 },
    so2: { low: 50, medium: 150, high: 250 },
    o3: { low: 50, medium: 100, high: 150 },
    no2: { low: 40, medium: 100, high: 200 },
    stink: { low: 0, medium: 0, high: 0 },
  }

  const typeThresholds = thresholds[type]
  if (!typeThresholds) {
    return 'red'
  }

  if (type === 'stink' && value > 0) {
    return 'red'
  }

  if (value <= typeThresholds.low) {
    return 'green'
  }
  if (value <= typeThresholds.medium) {
    return 'orange'
  }
  return 'red'
}

const handleMoveEnd = async () => {
  const leafletMap = map.value?.leafletObject
  if (!leafletMap) {
    console.warn('Map not ready yet')
    return
  }

  const bounds = leafletMap.getBounds()
  const southWest = bounds.getSouthWest()
  const northEast = bounds.getNorthEast()

  console.log('SouthWest:', southWest)
  console.log('NorthEast:', northEast)

  const types = selectedButtons.value.length > 0 ? selectedButtons.value : ['stink']

  const params = {
    x_lat: southWest.lat,
    x_lng: southWest.lng,
    y_lat: northEast.lat,
    y_lng: northEast.lng,
    type: types,
  }

  if (date.value?.start) {
    const selectedDate = new Date(date.value.start)

    const start = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        0,
        0,
        0,
        0,
      ),
    )

    const end = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        23,
        59,
        59,
        999,
      ),
    )

    params.from = start.toISOString()
    params.to = end.toISOString()
  }
  // if (date.value?.end) {
  //   params.to = date.value.end
  // }

  try {
    const result = await getMeasurementArea(params)
    console.log('results', result)

    const filtered = result.data.filter((item) => item.value > 0)
    console.log(filtered)

    dangerousStinksArea.value = filtered

    if (props.isLoggedIn) {
      locations.value = await getAllocations()
    }

    if (dangerousStinksArea.value) {
      console.log('New data from getMeasurementArea:', dangerousStinksArea.value)
    } else {
      console.warn('Brak danych z getMeasurementArea')
    }
  } catch (error) {
    console.error('Błąd w handleMoveEnd:', error)
  }
}

const zoomUpdate = async (updateZoom) => {
  zoom.value = updateZoom
  console.log('Zoom changed to:', zoom.value)
  if (props.isLoggedIn) {
    const allocations = await getAllocations()
    locations.value = allocations
    markerKey.value++
    console.log('Allocations:', locations.value)
  }
}

const centerUpdate = (centerUpdate) => {
  center.value = centerUpdate
  console.log('Center changed to:', center.value)
}

onMounted(async () => {
  let lat = center.value[0]
  let lng = center.value[1]

  if (navigator.geolocation) {
    try {
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject),
      )
      lat = pos.coords.latitude
      lng = pos.coords.longitude
      center.value = [lat, lng]
      console.log('Aktualna lokalizacja:', lat, lng)
    } catch (error) {
      console.error('Błąd pobierania lokalizacji:', error)
    }
  } else {
    console.error('Geolokalizacja nie jest wspierana przez przeglądarkę')
  }

  if (props.isLoggedIn) {
    const allocations = await getAllocations()
    locations.value = allocations
    console.log('Allocations:', locations.value, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  }

  const response = await getMeasurementArea({
    x_lat: lat - 0.1,
    x_lng: lng - 0.1,
    y_lat: lat + 0.1,
    y_lng: lng + 0.1,
    type: 'pm10',
  })
  console.log('Response from getMeasurementArea:', response?.value)
})

watch(
  () => date.value.start,
  async (newStart, oldStart) => {
    console.log(oldStart, 'Stara data')

    if (newStart) {
      console.log('Data została zmieniona:', newStart)
    } else {
      console.log('Data została usunięta')
    }

    await handleMoveEnd()
  },
)

const handleActive = async (button) => {
  const isCurrentlyActive = button.active

  if (isCurrentlyActive && selectedButtons.value.length === 1) {
    return
  }

  button.active = !isCurrentlyActive

  if (button.active) {
    if (!selectedButtons.value.includes(button.value)) {
      selectedButtons.value.push(button.value)
    }
  } else {
    selectedButtons.value = selectedButtons.value.filter((t) => t !== button.value)
  }

  await handleMoveEnd()
}

const buttons = ref([
  {
    id: 1,
    name: 'pm2.5',
    value: 'pm25',
    active: false,
    tooltip: 'Drobny pył zawieszony (PM2.5) - wnika głęboko do płuc',
  },
  {
    id: 2,
    name: 'pm10',
    value: 'pm10',
    active: false,
    tooltip: 'Pył zawieszony (PM10) - większe cząstki niż PM2.5, szkodliwe dla układu oddechowego',
  },
  {
    id: 3,
    name: 'so2',
    value: 'so2',
    active: false,
    tooltip: 'Dwutlenek siarki (SO₂) - może podrażniać drogi oddechowe',
  },
  {
    id: 4,
    name: 'o3',
    value: 'o3',
    active: false,
    tooltip: 'Ozon (O₃) - szkodliwy przy wysokim stężeniu, drażni oczy i płuca',
  },
  {
    id: 5,
    name: 'no2',
    value: 'no2',
    active: false,
    tooltip: 'Dwutlenek azotu (NO₂) - powstaje w spalinach, drażniący gaz',
  },
  {
    id: 6,
    name: 'stink',
    value: 'stink',
    active: true,
    tooltip: 'Zapachy - subiektywne wrażenie smrodu w powietrzu',
  },
])

const getPopupBackgroundImage = (value, type) => {
  const thresholds = {
    pm25: { low: 12, medium: 35, high: 55 },
    pm10: { low: 50, medium: 150, high: 250 },
    so2: { low: 50, medium: 150, high: 250 },
    o3: { low: 50, medium: 100, high: 150 },
    no2: { low: 40, medium: 100, high: 200 },
    stink: { low: 0, medium: 0, high: 0 },
  }

  const typeThresholds = thresholds[type]
  if (!typeThresholds || !value) {
    return 'url("/images/BAD.png")'
  }

  if (type === 'stink' && value > 0) {
    return 'url("/images/BAD.png")'
  }

  if (value <= typeThresholds.low) {
    return 'url("/images/GOOD.png")'
  }
  if (value <= typeThresholds.medium) {
    return 'url("/images/MEDIUM.png")'
  }
  return 'url("/images/BAD.png")'
}
</script>

<style scoped>
.side-panel {
  position: absolute;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100%;
  background-color: #29323d;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease;
  z-index: 1000;
}

.side-panel-visible {
  left: 0;
}

.panel-content {
  padding: 20px;
  color: #333;
}

.flag-btn {
  width: 60px;
  height: 40px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  margin: 10px;
  border: 2px solid transparent;
}

.flag-btn.active {
  border-color: #06d2a1;
}

.flag-btn:nth-child(2) {
  background-image: url('https://flagcdn.com/w40/pl.png');
}

.flag-btn:nth-child(3) {
  background-image: url('https://flagcdn.com/w40/gb.png');
}

:deep(.leaflet-popup-content-wrapper, .leaflet-popup-tip) {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  color: inherit !important;
}
</style>
