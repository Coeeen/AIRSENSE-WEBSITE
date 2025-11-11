<template>
  <div
    class="row col-12 q-col-gutter-x-md items-stretch q-px-sm"
    :class="$q.screen.lt.md ? 'column' : ''"
  >
    <air-card class="col-6" style="color: #1b2767">
      <template #section1>
        <div style="font-size: 15px" class="q-mb-md">{{ t('dashboard.main.aktualnaMapa') }}</div>
      </template>
      <template #section2>
        <div style="height: 400px">
          <main-map :visible-date="false" :is-logged-in="true" />
        </div>
      </template>
      <template #section3>
        <div style="font-size: 15px" class="q-my-md">
          {{ t('dashboard.main.czestotliwosc') }}
        </div>
        <temperature-chart
          :options="smellFrequency.options"
          :series="smellFrequency.series"
          style="height: 300px; margin-bottom: 40px"
        />
      </template>
    </air-card>
    <div class="col-6 row">
      <air-card class="col-12" style="color: #1b2767">
        <template #section1>
          <div>{{ t('dashboard.main.aktualneDane') }}</div>
        </template>
        <template #section2>
          <div class="q-mt-md">
            <temperature-chart
              type="heatmap"
              :options="smellHeatmap.options"
              :series="smellHeatmap.series"
              height="400px"
            />
          </div>
        </template>
      </air-card>
      <air-card class="col-12 row" style="color: #1b2767; height: 390px">
        <template #section1>
          <div>{{ t('dashboard.main.aktualneDane') }}</div>
        </template>
        <template #section2>
          <temperature-chart
            type="scatter"
            :options="timelineChart.options"
            :series="timelineChart.series"
            height="300px"
          />
        </template>
      </air-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useLocationStore } from 'src/stores/LocationStore.js'
import { useMapStore } from 'src/stores/MapStore'
const { getAllocations } = useLocationStore()
const { getMeasurementArea } = useMapStore()
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import moment from 'moment'

import AirCard from 'src/components/common/AirCard.vue'
import MainMap from 'src/components/MainMap.vue'
import TemperatureChart from 'src/components/charts/TemperatureChart.vue'

const locationData = ref([])
const from = moment().startOf('month').format('YYYY-MM-DD')
const to = moment().format('YYYY-MM-DD')

const getCurrentData = async () => {
  try {
    const allocations = await getAllocations()

    const nestedLocations = []

    for (const loc of allocations) {
      const lat = parseFloat(loc.lat)
      const lng = parseFloat(loc.lng)

      const params = {
        x_lat: lat - 0.1,
        x_lng: lng - 0.1,
        y_lat: lat + 0.1,
        y_lng: lng + 0.1,
        from,
        to,
        type: ['so2', 'o3', 'no2', 'stink', 'pm10', 'pm25'],
      }

      const res = await getMeasurementArea(params)

      const measurements = res?.data?.length ? res.data : []

      nestedLocations.push({
        ...loc,
        allMeasurements: measurements.map((el) => ({
          ...el,
          locationId: loc.id,
          locationName: loc.name,
        })),
      })
    }

    locationData.value = nestedLocations
    console.log('Lokalizacje z pomiarami:', locationData.value)
  } catch (error) {
    console.error('Błąd podczas pobierania danych:', error)
  }
}

const smellFrequency = computed(() => {
  const counts = {}

  for (const el of locationData.value) {
    const locName = el.name || 'Nieznana lokalizacja'
    const measurements = el.allMeasurements || []

    const stinkCount = measurements.filter((m) => m.value > 0).length

    counts[locName] = stinkCount
  }

  const categories = Object.keys(counts)
  const data = categories.map((loc) => counts[loc])

  return {
    series: [
      {
        name: 'Liczba przypadków smrodu',
        data,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 300,
      },
      xaxis: {
        categories,
      },
      yaxis: {},

      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: false,
        },
      },
    },
  }
})

const smellHeatmap = computed(() => {
  // const startDate = moment().startOf('month') to jesli chcemy od poczatku miesiace jak myslalem
  const startDate = moment()
  const endDate = moment().add(6, 'days')

  const totalDays = endDate.diff(startDate, 'days') + 1

  const allDays = Array.from({ length: totalDays }, (_, i) =>
    moment(startDate).add(i, 'days').format('YYYY-MM-DD'),
  )

  const series = []
  const colorPalette = [
    '#1E88E5',
    '#D81B60',
    '#43A047',
    '#FB8C00',
    '#8E24AA',
    '#00ACC1',
    '#F4511E',
    '#3949AB',
  ]

  console.log('Lokalizacje:', locationData.value)

  locationData.value.forEach((loc, index) => {
    const measurementsByDay = {}

    for (const m of loc.allMeasurements || []) {
      const date = moment(m.time).format('YYYY-MM-DD')
      if (!measurementsByDay[date]) measurementsByDay[date] = []
      measurementsByDay[date].push(m)
    }

    const data = allDays.map((day) => {
      const values = measurementsByDay[day] || []
      const stinkCount = values.filter((v) => v.value > 0).length

      return {
        x: day,
        y: stinkCount > 0 ? stinkCount : null,
      }
    })

    series.push({
      name: loc.name || `Lokalizacja ${index + 1}`,
      data,
    })
  })

  return {
    series,
    options: {
      chart: {
        type: 'heatmap',
        height: 350,
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          useFillColorAsStroke: false,
          colorScale: {
            ranges: [
              { from: 1, to: 0, color: '#D81B60' },
              { from: 0, to: 0, color: '#ECEFF1' },
            ],
          },
        },
      },
      colors: colorPalette.slice(0, locationData.value.length),
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
      },
      tooltip: {
        y: {
          formatter: (val) => (val === null ? 'Brak danych' : `Liczba: ${val}`),
        },
      },
    },
  }
})

const typeLabels = ['so2', 'o3', 'no2', 'stink', 'pm25', 'pm10']

const timelineChart = computed(() => {
  const series = []

  locationData.value.forEach((loc, idx) => {
    const data = (loc.allMeasurements || []).map((m) => ({
      x: new Date(m.time).getTime(),
      y: typeLabels.indexOf(m.type),
      value: m.value,
      label: m.type,
    }))

    series.push({
      name: loc.name || `Lokalizacja ${idx + 1}`,
      data,
    })
  })

  return {
    series,
    options: {
      chart: {
        type: 'scatter',
        height: 300,
        zoom: { enabled: true },
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        tickAmount: typeLabels.length - 1,
        min: -0.5,
        max: typeLabels.length - 0.5,
        labels: {
          formatter: (val) => typeLabels[Math.round(val)] || '',
        },
      },
      tooltip: {
        custom: ({ seriesIndex, dataPointIndex, w }) => {
          const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
          return `
            <div style="padding: 5px">
              <strong>${w.globals.seriesNames[seriesIndex]}</strong><br/>
              Typ: ${point.label}<br/>
              Data: ${moment(point.x).format('YYYY-MM-DD HH:mm')}<br/>
              Wartość: ${point.value}
            </div>
          `
        },
      },
      markers: {
        size: 5,
      },
    },
  }
})

onMounted(async () => {
  getCurrentData()
})
</script>
