<template>
  <div
    class="row col-12 flex q-col-gutter-x-md items-stretch q-px-sm"
    :class="$q.screen.lt.md ? 'column reverse' : ''"
  >
    <air-card
      :class="selectedLocation || clickedLatLng ? 'col-8' : 'col-12'"
      style="color: #1b2767"
    >
      <template #section1>
        <div class="col-12 row q-col-gutter-x-xs justify-center">
          <div
            style="font-size: 15px"
            class="q-mb-md col-md-3 col-xs-12 cursor-pointer q-pa-sm"
            :class="selectedView === 'table' ? 'bg-primary text-white text-center' : ''"
            :style="selectedView === 'table' ? 'border-radius:20px' : ''"
            @click="handleSelectView('table')"
          >
            {{ t('dashboard.raporty.wybierzZUlubionych') }}
          </div>
          <div
            style="font-size: 15px"
            class="q-mb-md col-md-3 col-xs-12 cursor-pointer q-pa-sm text-center"
            :class="selectedView === 'map' ? 'bg-primary text-white ' : ''"
            :style="selectedView === 'map' ? 'border-radius:20px' : ''"
            @click="handleSelectView('map')"
          >
            {{ t('dashboard.raporty.wybierzZMapy') }}
          </div>
        </div>
      </template>
      <template #section2>
        <div class="q-mb-md">{{ t('dashboard.raporty.wybierzLokalizacje') }}</div>
        <div v-if="selectedView === 'table'">
          <AirMockupTable class="q-mx-sm" :data="rowsDataLocations" :columns="columns">
            <template #body-cell-select="props">
              <q-td :props="props">
                <div class="q-gutter-sm row justify-center q-mr-sm">
                  <air-icon
                    :tooltip="t('dashboard.raporty.lokalizacjaTooltip')"
                    size="xs"
                    :icon-name="
                      selectedLocation === props.row.id ? 'EDIT_TABLE_WHITE' : 'EDIT_TABLE'
                    "
                    style="cursor: pointer"
                    class="row justify-center"
                    :style="
                      selectedLocation === props.row.id
                        ? 'background:#1b2767;padding:5px;border-radius:10px;'
                        : ''
                    "
                    @click="handleSetLocation(props.row.id)"
                  />
                </div>
              </q-td>
            </template>

            <template #body-cell-description="props">
              <q-td :props="props">
                <air-btn
                  v-if="props.row.description !== null || undefined || ''"
                  size="xs"
                  :title="t('otworz')"
                />
                <q-popup-proxy cover :breakpoint="1920">
                  <air-card
                    :card-type="' descPopup'"
                    :style="$q.screen.gt.md ? 'min-width: 600px' : 'min-width: 300px'"
                  >
                    <template #section1>
                      <q-card-section>
                        <div style="font-size: 15px" class="text-center q-mb-md">
                          {{ t('dashboard.raporty.opisLokalizacji') }}
                        </div>
                        <div class="q-my-sm q-pa-md cursor-not-allowed" style="border-radius: 5px">
                          {{ props.row.description }}
                        </div>
                      </q-card-section>
                    </template>
                    <template #section2>
                      <q-card-section class="row justify-center q-px-xs q-pt-xs">
                        <air-btn title="Ok" v-close-popup />
                      </q-card-section>
                    </template>
                  </air-card>
                </q-popup-proxy>
              </q-td>
            </template>

            <template #body-cell-isStinking="props">
              <q-td :props="props">
                <div
                  class="q-mx-md q-pa-xs text-center"
                  style="border-radius: 10px"
                  :style="
                    props.row.isStinking ? 'background-color:#FBE7E8' : 'background-color:#EBF9F1'
                  "
                >
                  <span :style="props.row.isStinking ? 'color:#A30D11' : 'color:#1F9254'">{{
                    props.row.isStinking ? t('smierdzi') : t('neutralnie')
                  }}</span>
                </div>
              </q-td>
            </template>
          </AirMockupTable>
        </div>
        <div v-if="selectedView === 'map'" style="height: 400px" class="background-color: #f5f5f5">
          <main-map
            :visible-date="false"
            :is-logged-in="true"
            :clickedLatLng="clickedLatLng"
            @onMapClick="onMapClick"
          />
        </div>
        <div v-if="rowsDataRaports.length > 0">
          <div class="q-mt-md">{{ t('dashboard.raporty.archiwalneDane') }}</div>
          <AirMockupTable
            class="q-mx-sm"
            :data="rowsDataRaports"
            :columns="columnsRaports.filter((col) => col.visible)"
          />
        </div>
      </template>
    </air-card>
    <air-card
      class="col-4"
      style="color: #1b2767"
      v-if="selectedLocation !== null || clickedLatLng"
    >
      <template #section1>
        <div class="col-12 row q-col-gutter-x-xs">
          <div style="font-size: 15px" class="q-mb-md col-12">
            {{ t('dashboard.raporty.filtryRaportu') }}
          </div>
          <div class="row q-mb-md col-12">
            <div class="col-12 q-mb-sm">{{ t('dashboard.raporty.daneUsrednioneNa') }}</div>
            <q-btn
              color="primary"
              :label="t('dzien')"
              :class="{ 'bg-blue-10 text-white': createRaport.groupBy === 'day' }"
              style="flex: 1; margin-right: 20px"
              no-caps
              @click="createRaport.groupBy = 'day'"
            />

            <q-btn
              color="primary"
              :label="t('miesiac')"
              :class="{ 'bg-blue-8 text-white': createRaport.groupBy === 'month' }"
              style="flex: 1"
              no-caps
              @click="createRaport.groupBy = 'month'"
            />
          </div>
          <div class="col-12 row">
            <air-select
              v-model="createRaport.type"
              :multiple="true"
              option-value="value"
              option-label="name"
              :options="optionsTypes"
              :label="t('parametry')"
              :placeholder="t('parametry')"
              class="col-12"
            />
            <air-input-date
              v-model="createRaport.startDate"
              :label="t('zakresDatyOd')"
              class="q-mb-sm customclassfirst"
              style="width: 100%"
            />

            <air-input-date
              v-model="createRaport.endDate"
              :label="t('zakresDatyDo')"
              class="q-mb-sm customclasssecond"
              style="width: 100%"
              :rules="[validateEndDate]"
            />

            <div class="col-12 row justify-between">
              <q-btn
                :disable="!isDateRangeValid"
                :label="t('wygenerujDane')"
                color="primary"
                no-caps
                class="q-mt-md col-12"
                @click="handleGetDataRaports"
              />

              <q-btn
                v-if="rowsDataRaports.length > 0"
                color="primary"
                icon-right="download"
                :label="t('pobierzRaport')"
                no-caps
                class="q-mt-md col-5"
                @click="exportTable"
              />

              <q-btn
                v-if="rowsDataRaports.length > 0"
                no-caps
                :label="t('wyczyscDane')"
                color="primary"
                icon="clear"
                @click="resetForm"
                class="q-mt-md col-5"
              />
            </div>
          </div>
        </div>
      </template>
    </air-card>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { exportFile, useQuasar } from 'quasar'
import moment from 'moment'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { useLocationStore } from 'src/stores/LocationStore.js'
import { useRaportsStore } from 'src/stores/RaportsStore.js'
const { getAllocations } = useLocationStore()
const { getRaportsArea } = useRaportsStore()

import AirCard from 'src/components/common/AirCard.vue'
import AirMockupTable from 'src/components/common/table/AirMockupTable.vue'
import AirIcon from 'src/components/common/buttons/AirIcon.vue'
import AirInputDate from 'src/components/common/form/AirInputDate.vue'
import MainMap from 'src/components/MainMap.vue'
import AirSelect from 'src/components/common/form/AirSelect.vue'

const $q = useQuasar()
const rowsDataLocations = ref([])
const rowsDataRaports = ref([])
const clickedLatLng = ref()
const selectedLocation = ref(null)
const isGenerated = ref(false)
const optionsTypes = computed(() => [
  { name: t('zachmurzenie'), value: 'cloud_cover' },
  { name: t('wilgotnosc'), value: 'humidity' },
  { name: t('pm10'), value: 'pm10' },
  { name: t('pm25'), value: 'pm25' },
  { name: t('opady'), value: 'precipitation' },
  { name: t('cisnienie'), value: 'pressure' },
  { name: t('dwutlenekSiarki'), value: 'so2' },
  { name: t('ozon'), value: 'o3' },
  { name: t('dwutlenekAzotu'), value: 'no2' },
  { name: t('zapach'), value: 'stink' },
  { name: t('temperatura'), value: 'temperature' },
  { name: t('kierunekWiatru'), value: 'wind_direction' },
  { name: t('predkoscWiatru'), value: 'wind_speed' },
])

const createRaport = ref({
  startDate: '',
  endDate: '',
  groupBy: 'day',
  type: [],
})

const selectedView = ref('table')

const handleSelectView = (view) => {
  selectedView.value = view
}

const handleSetLocation = (id) => {
  selectedLocation.value = id
}

const handleGetDataRaports = async () => {
  let lat, lng
  isGenerated.value = true

  if (selectedView.value === 'table' && selectedLocation.value) {
    const location = rowsDataLocations.value.find(
      (location) => location.id === selectedLocation.value,
    )
    if (!location) {
      $q.notify({ message: t('errors.nieWybranoLokalizacji'), color: 'negative' })
      return
    }
    lat = location.lat
    lng = location.lng
  } else if (selectedView.value === 'map' && clickedLatLng.value) {
    console.log('Clicked LatLng:', clickedLatLng.value)
    lat = clickedLatLng.value[0]
    lng = clickedLatLng.value[1]
  } else {
    $q.notify({
      message: t('errors.sprawdzCzyWybralesLokalizacje'),
      color: 'negative',
    })
    return
  }

  const res = await getRaportsArea({
    lat,
    lng,
    from: createRaport.value.startDate,
    to: createRaport.value.endDate,
    groupBy: createRaport.value.groupBy,
    types: Array.isArray(createRaport.value.type)
      ? createRaport.value.type
      : [createRaport.value.type],
  })

  rowsDataRaports.value = res.rows
  if (res.rows.length === 0) {
    $q.notify({
      message: t('errors.brakDanychDlaLokalizacji'),
      color: 'negative',
    })
  }
}

const validateEndDate = (val) => {
  if (!val || !createRaport.value.startDate) return true
  return new Date(val) >= new Date(createRaport.value.startDate)
    ? true
    : t('errors.zlaDataZakonczenia')
}

const isDateRangeValid = computed(() => {
  const { startDate, endDate, type } = createRaport.value
  return (
    startDate &&
    endDate &&
    new Date(endDate) >= new Date(startDate) &&
    Array.isArray(type) &&
    type.length > 0
  )
})

const resetForm = () => {
  createRaport.value = {
    startDate: '',
    endDate: '',
    groupBy: 'day',
    type: [],
  }
  selectedLocation.value = null
  clickedLatLng.value = null
  rowsDataRaports.value = []
  isGenerated.value = false
}

const onMapClick = (event) => {
  console.log('Clicked LatLng:', event)
  clickedLatLng.value = event
}

onMounted(async () => {
  rowsDataLocations.value = await getAllocations()
})

const wrapCsvValue = (val, formatFn, row) => {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val

  formatted = formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}

const exportTable = () => {
  const content = [
    columnsRaports.value.filter((col) => col.visible).map((col) => wrapCsvValue(col.label)),
  ]
    .concat(
      rowsDataRaports.value.map((row) =>
        columnsRaports.value
          .filter((col) => col.visible)
          .map((col) =>
            wrapCsvValue(
              typeof col.field === 'function' ? col.field(row) : row[col.field ?? col.name],
              col.format,
              row,
            ),
          )
          .join(','),
      ),
    )
    .join('\r\n')

  const status = exportFile('table-export.csv', content, 'text/csv')

  if (status !== true) {
    $q.notify({
      message: t('errors.bladPobieraniaPliku'),
      color: 'negative',
      icon: 'warning',
    })
  }
}

const columns = computed(() => [
  {
    name: 'select',
    label: t('wybierz'),
    align: 'left',
    field: (row) => row.id,
    sortable: true,
    headerStyle: 'width:50px',
  },
  {
    name: 'name',
    label: t('nazwa'),
    align: 'left',
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: 'description',
    label: t('opis'),
    align: 'center',
    field: (row) => (row.description ? row.description : 'Brak opisu'),
    sortable: true,
    headerStyle: 'width:50px',
  },
  {
    name: 'createdAt',
    label: t('dataDodania'),
    align: 'center',
    field: (row) => moment(row.createdAt).format('DD.MM.YYYY HH:mm'),
    sortable: true,
  },
  {
    name: 'isStinking',
    label: t('status'),
    align: 'center',
    field: (row) => row.isStinking,
    sortable: true,
    headerStyle: 'width:100px',
  },
])

const columnsRaports = computed(() => {
  const filteredColumns = [
    {
      name: 'date',
      label: t('data'),
      align: 'left',
      field: (row) => (row.date !== undefined ? moment(row.date).format('DD.MM.YYYY') : 'Brak'),
      sortable: true,
      visible: true,
    },
    {
      name: 'stink',
      label: t('zapach'),
      align: 'left',
      field: (row) => (row.stink !== undefined ? row.stink.toFixed(2) : 'Brak'),
      sortable: true,
      headerStyle: 'width:50px',
      visible: false,
    },
    {
      name: 'no2',
      label: t('dwutlenekAzotu'),
      align: 'left',
      field: (row) => (row.no2 !== undefined ? row.no2.toFixed(2) : 'Brak'),
      sortable: true,
      visible: false,
    },
    {
      name: 'pm10',
      label: t('pm10'),
      align: 'left',
      field: (row) => (row.pm10 !== undefined ? row.pm10.toFixed(2) : 'Brak PM10'),
      sortable: true,
      visible: false,
    },
    {
      name: 'pm25',
      label: t('pm25'),
      align: 'left',
      field: (row) => (row.pm25 !== undefined ? row.pm25.toFixed(2) : 'Brak PM2.5'),
      sortable: true,
      visible: false,
    },
    {
      name: 'so2',
      label: t('dwutlenekSiarki'),
      align: 'center',
      field: (row) => (row.so2 !== undefined ? row.so2.toFixed(2) : 'Brak'),
      sortable: true,
      headerStyle: 'width:100px',
      visible: false,
    },
    {
      name: 'wind_direction',
      label: t('kierunekWiatru'),
      align: 'left',
      field: (row) => (row.wind_direction !== undefined ? row.wind_direction.toFixed(2) : 'Brak'),
      sortable: true,
      headerStyle: 'width:50px',
      visible: false,
    },
    {
      name: 'temperature',
      label: t('temperatura'),
      align: 'left',
      field: (row) => (row.temperature !== undefined ? row.temperature.toFixed(2) : 'Brak'),
      sortable: true,
      visible: false,
    },
    {
      name: 'humidity',
      label: t('wilgotnosc'),
      align: 'left',
      field: (row) => (row.humidity !== undefined ? row.humidity.toFixed(2) : 'Brak'),
      sortable: true,
      visible: false,
    },
    {
      name: 'pressure',
      label: t('cisnienie'),
      align: 'left',
      field: (row) => (row.pressure !== undefined ? row.pressure.toFixed(2) : 'Brak'),
      sortable: true,
      visible: false,
    },
    {
      name: 'cloud_cover',
      label: t('zachmurzenie'),
      align: 'center',
      field: (row) => (row.cloud_cover !== undefined ? row.cloud_cover.toFixed(2) : 'Brak'),
      sortable: true,
      headerStyle: 'width:100px',
      visible: false,
    },
    {
      name: 'precipitation',
      label: t('opady'),
      align: 'left',
      field: (row) => (row.precipitation !== undefined ? row.precipitation.toFixed(2) : 'Brak'),
      sortable: true,
      headerStyle: 'width:50px',
      visible: false,
    },
    {
      name: 'o3',
      label: t('ozon'),
      align: 'left',
      field: (row) => (row.o3 !== undefined ? row.o3.toFixed(2) : 'Brak'),
      sortable: true,
      visible: false,
    },
  ]

  filteredColumns.forEach((column) => {
    column.visible = createRaport.value.type.includes(column.name) || column.name === 'date'
  })

  return filteredColumns
})

const filterColumnsByType = () => {
  const dateColumn = columnsRaports.value.find((column) => column.name === 'date')
  if (dateColumn) {
    dateColumn.visible = true
  }

  columnsRaports.value.forEach((column) => {
    if (column.name !== 'date' && createRaport.value.type.includes(column.name)) {
      column.visible = true
    } else if (column.name !== 'date') {
      column.visible = false
    }
  })
}

watch(() => createRaport.value.type, filterColumnsByType, { immediate: true })

watch(
  () => createRaport.value.type,
  () => {
    if (isGenerated.value) {
      handleGetDataRaports()
    }
  },
  { deep: true },
)
</script>
