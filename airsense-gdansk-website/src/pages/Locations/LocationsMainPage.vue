<template>
  <air-card class="col-12" style="color: #1b2767">
    <template #section1>
      <div class="q-mb-md">{{ t('dashboard.lokalizacje.filtry') }}</div>
      <!-- class="col-12 row q-mb-md q-mx-sm q-py-xs q-pb-sm"
    style="background-color: white; border-radius: 10px"
  > -->
      <div class="col-md-8 col-12-sm col-12-xs row">
        <air-input
          v-model="filter.name"
          :placeholder="t('nazwa')"
          :label="t('nazwa')"
          class="q-ml-sm col-xs-12 col-md-2"
        />
        <air-input
          v-model="filter.description"
          :placeholder="t('opis')"
          :label="t('opis')"
          class="q-ml-sm col-xs-12 col-md-2"
        />
        <air-input-date
          v-model="filter.createdAt"
          :placeholder="t('dataDodania')"
          :label="t('dataDodania')"
          class="q-ml-sm col-xs-12 col-md-2"
        />
      </div>
      <div class="col-4 row justify-end items-center">
        <air-btn
          class="q-mr-md-md q-my-md col-xs-12 col-md-2"
          btn-type="create"
          :type="create"
          :title="t('dashboard.lokalizacje.utworzLokalizacje')"
          :tooltip="t('dashboard.lokalizacje.utworzLokalizacjeTooltip')"
          @click="handleOpenCreatePopup"
        />
      </div>
    </template>
    <template #section2>
      <div class="q-mb-md">{{ t('dashboard.lokalizacje.twojeLokalizacje') }}</div>
      <AirMockupTable :data="filteredRowsData" :columns="columns" :visible-columns="['']">
        <template #body-cell-icon="props">
          <q-td :props="props">
            <div>
              <q-img
                width="30px"
                height="30px"
                style="border-radius: 10px"
                :src="props.row.icon"
                alt="icon"
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
                :card-type="'descPopup'"
                :style="$q.screen.gt.md ? 'min-width: 600px' : 'min-width: 300px'"
              >
                <template #section1>
                  <q-card-section>
                    <div style="font-size: 15px" class="text-center q-mb-md">
                      {{ t('dashboard.lokalizacje.opisLokalizacji') }}
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

        <template #body-cell-id="props">
          <q-td :props="props">
            <div class="q-gutter-sm row justify-center q-mr-sm">
              <air-icon
                :tooltip="t('dashboard.lokalizacje.usunLokalizacje')"
                size="xs"
                icon-name="DELETE"
                style="color: #a30d11; cursor: pointer"
                @click="handleOpenDeletePopup(props.row.id)"
              />
              <air-icon
                :tooltip="t('dashboard.lokalizacje.edytujLokalizacje')"
                size="xs"
                icon-name="EDIT"
                style="color: #a30d11; cursor: pointer"
                @click="handleOpenEditPopup(props.row.id)"
              />
            </div>
          </q-td>
        </template>
      </AirMockupTable>
    </template>
  </air-card>

  <!--  popup-->
  <q-dialog v-model="deleteLocationStatusPopUp">
    <q-card style="background: #333e44">
      <q-card-section>
        <div class="text-white text-center" style="font-size: 18px">
          {{ t('dashboard.lokalizacje.potwierdzUsuniecieLokalizacji') }}
        </div>
      </q-card-section>
      <q-card-section class="flex justify-between full-width text-white">
        <q-btn
          v-close-popup
          flat
          no-caps
          :label="t('tak')"
          class="bg-primary"
          @click="handleDeleteLocation"
        />
        <q-btn no-caps v-close-popup flat :label="t('nie')" style="background-color: #c5030e" />
      </q-card-section>
    </q-card>
  </q-dialog>

  <!--  popup-->
  <q-dialog v-model="createLocationStatusPopUp" persistent>
    <q-card
      :style="$q.screen.gt.md ? 'min-width: 1100px' : 'min-width: 300px'"
      style="background-color: #f1f1f1"
    >
      <q-card-section class="row">
        <div class="text-h6" style="font-size: 17px">
          {{ t('dashboard.lokalizacje.naglowekUtworzeniaLokalizacji') }}
        </div>
        <q-space />
        <!-- <air-btn-icon
          custom-class="transparent"
          icon-name="clear"
          @click="handleClearData"
        /> -->
      </q-card-section>
      <q-card-section class="row col-12">
        <div class="col-12 row">
          <div class="row col-12 q-mt-sm">
            <air-input
              v-model="createLocationData.name"
              :label="t('dashboard.lokalizacje.pelnaNazwa')"
              :placeholder="t('dashboard.lokalizacje.pelnaNazwa')"
              class="col-12"
            />
          </div>

          <div class="col-12 q-mt-sm row">
            <air-text-area
              :label="t('dashboard.lokalizacje.opisLokalizacji')"
              :placeholder="t('dashboard.lokalizacje.opisLokalizacji')"
              v-model="createLocationData.description"
              customClass="col-12"
            />
          </div>
          <div class="col-12 q-mt-md">
            {{ t('dashboard.lokalizacje.kliknijAbyPobracLokalizacje') }}
          </div>
          <div style="height: 400px; width: 100%" class="q-mt-md">
            <main-map
              :visible-date="false"
              :is-logged-in="true"
              :clickedLatLng="clickedLatLng"
              @onMapClick="onMapClick"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="flex justify-center full-width text-white">
        <q-btn style="color: #016ef4" no-caps flat :label="t('anuluj')" v-close-popup />
        <q-btn
          v-close-popup
          flat
          no-caps
          :label="t('zapisz')"
          @click="handleCreateLocation"
          class="bg-primary q-ml-lg"
          style="border-radius: 25px; width: 125px"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <!--  popup-->
  <!-- eslint-disable-next-line -->
  <q-dialog v-model="updateLocationStatusPopUp" persistent>
    <q-card
      :style="$q.screen.gt.md ? 'min-width: 1100px' : 'min-width: 300px'"
      style="background-color: #f1f1f1"
    >
      <q-card-section class="row">
        <div class="text-h6" style="font-size: 17px">
          {{ t('dashboard.lokalizacje.naglowekEdycjiLokalizacji') }}
        </div>
        <q-space />
        <!-- <air-btn-icon
          custom-class="transparent"
          icon-name="clear"
          @click="handleClearData"
        /> -->
      </q-card-section>
      <q-card-section class="row col-12">
        <div class="col-12 row q-col-gutter-x-md">
          <div class="col-12 q-mt-sm">
            <air-input
              v-model="editedLocation.name"
              :label="t('dashboard.lokalizacje.pelnaNazwa')"
              :placeholder="t('dashboard.lokalizacje.pelnaNazwa')"
              class="col-12"
            />
          </div>

          <div class="col-12 q-mt-sm">
            <air-text-area
              :label="t('dashboard.lokalizacje.opisLokalizacji')"
              :placeholder="t('dashboard.lokalizacje.opisLokalizacji')"
              v-model="editedLocation.description"
              custom-class="col-12"
            />
          </div>
          <div class="col-12 q-mt-md">
            {{ t('dashboard.lokalizacje.kliknijAbyPobracLokalizacje') }}
          </div>
          <div style="height: 400px; width: 100%" class="q-mt-md">
            <main-map
              :visible-date="false"
              :is-logged-in="true"
              :clickedLatLng="clickedLatLng"
              @onMapClick="onMapClick"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="flex justify-center full-width text-white">
        <q-btn style="color: #016ef4" no-caps flat label="anuluj" v-close-popup />
        <q-btn
          v-close-popup
          flat
          no-caps
          :label="t('zapisz')"
          @click="handleUpdateLocation"
          class="bg-primary q-ml-lg"
          style="border-radius: 25px; width: 125px"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLocationStore } from 'src/stores/LocationStore.js'
import moment from 'moment'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import AirMockupTable from 'src/components/common/table/AirMockupTable.vue'
import AirInput from 'src/components/common/form/AirInput.vue'
import AirInputDate from 'src/components/common/form/AirInputDate.vue'
import AirBtn from 'src/components/common/buttons/AirBtn.vue'
import AirTextArea from 'src/components/common/form/AirTextArea.vue'
import MainMap from 'src/components/MainMap.vue'

const { getAllocations, createLocation, deleteLocation, updateLocation } = useLocationStore()

const $q = useQuasar()

const deleteLocationStatusPopUp = ref(false)
const createLocationStatusPopUp = ref(false)
const updateLocationStatusPopUp = ref(false)
const createLocationData = ref({})
const selectedID = ref(null)
const editedLocation = ref()
const clickedLatLng = ref()
const filter = ref({
  name: '',
  description: '',
  createdAt: null,
})

const filteredRowsData = computed(() => {
  return rowsData.value.filter((row) => {
    const matchesName =
      !filter.value.name || row.name?.toLowerCase().includes(filter.value.name.toLowerCase())
    const matchesDescription =
      !filter.value.description ||
      row.description?.toLowerCase().includes(filter.value.description.toLowerCase())
    const matchesCreatedAt =
      !filter.value.createdAt ||
      new Date(row.createdAt).toLocaleDateString() ===
        new Date(filter.value.createdAt).toLocaleDateString()

    return matchesName && matchesDescription && matchesCreatedAt
  })
})

const handleOpenDeletePopup = (id) => {
  deleteLocationStatusPopUp.value = true
  selectedID.value = id
}

const handleOpenCreatePopup = () => {
  createLocationStatusPopUp.value = true
}

const handleOpenEditPopup = (id) => {
  updateLocationStatusPopUp.value = true
  selectedID.value = id
  editedLocation.value = { ...rowsData.value.find((row) => row.id === id) }
  clickedLatLng.value[0] = editedLocation.value.lat
  clickedLatLng.value[1] = editedLocation.value.lng
  console.log('editedLocation.value:', selectedID.value)
}

const handleCreateLocation = async () => {
  try {
    await createLocation({
      name: createLocationData.value.name,
      description: createLocationData.value.description,
      lat: clickedLatLng.value[0],
      lng: clickedLatLng.value[1],
    })
    rowsData.value = await getAllocations()
    clickedLatLng.value = null
    createLocationData.value = {}
  } catch (error) {
    console.error('Error creating location:', error)
    $q.notify({
      type: 'negative',
      message: t('errors.sprawdzCzyWybralesLokalizacje'),
    })
  }
}

const handleUpdateLocation = async () => {
  try {
    console.log(
      selectedID.value,
      editedLocation.value.name,
      editedLocation.value.description,
      clickedLatLng.value[0],
      clickedLatLng.value[1],
    )
    console.log('editedLocation.value:', editedLocation.value)

    await updateLocation({
      id: selectedID.value,
      name: editedLocation.value.name,
      description: editedLocation.value.description,
      lat: clickedLatLng.value[0],
      lng: clickedLatLng.value[1],
    })
    rowsData.value = await getAllocations()
    clickedLatLng.value = null
  } catch (error) {
    console.error('Error updating location:', error)
    $q.notify({
      type: 'negative',
      message: t('errors.sprawdzCzyWybralesLokalizacje'),
    })
  }
  selectedID.value = null
  editedLocation.value = null
}

const handleDeleteLocation = async () => {
  await deleteLocation(selectedID.value)
  rowsData.value = await getAllocations()
}

const onMapClick = (event) => {
  console.log('Clicked LatLngxxxxxxxxxxxxxxxxxxxxxxxxxx:', event)
  clickedLatLng.value = event
}

onMounted(async () => {
  rowsData.value = await getAllocations()
  console.log(rowsData.value)
})

const rowsData = ref([])

const columns = computed(() => [
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
    field: (row) => (row.description ? row.description : t('brakOpisu')),
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
  {
    name: 'id',
    label: t('akcje'),
    align: 'center',
    field: (row) => row.id,
    sortable: true,
  },
])
</script>
