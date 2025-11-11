<template>
  <q-table
    flat
    row-key="preview"
    :rows="props.data"
    :columns="columns"
    :class="customClass"
    class="air-table"
    :rows-per-page-options="[50, 100, 200]"
    :dense="dense"
    :hide-header="hideHeader"
    rows-per-page-label="Wpisy na stronę"
    :pagination-label="(start, end, total) => `${start}-${end} z ${total}`"
    :no-data-label="t('brakDanichTabeli')"
    :no-results-label="t('brakDanichTabeli')"
  >
    <template v-for="(_, slot) in slots" #[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>

    <!--    <template v-slot:body="props">-->
    <!--      <q-tr-->
    <!--        :props="props"-->
    <!--        :class="props.rowIndex % 2 === 0 ? 'even-row' : 'odd-row'"-->
    <!--      >-->
    <!--        <q-td v-for="col in columns" :key="col.name" :props="props">-->
    <!--          {{ props.row[col.name] }}-->
    <!--        </q-td>-->
    <!--      </q-tr>-->
    <!--    </template>-->

    <template v-slot:header-cell="props">
      <q-th :props="props" style="background-color: white">
        {{ props.col.label }}
      </q-th>
    </template>
  </q-table>
</template>

<script setup>
import { useSlots } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const slots = useSlots()

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },

  visibleColumns: {
    type: Array,
    required: false,
    default: () => {
      return []
    },
  },
  selection: {
    type: String,
    required: false,
    default: null,
  },
  customClass: {
    type: String,
    required: false,
    default: '',
  },
  selectedItems: {
    type: Array,
    required: false,
    default: () => {
      return []
    },
  },
  grid: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  hideHeader: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  dense: {
    type: Boolean,
    required: false,
    default: () => true,
  },
})
</script>

<style lang="scss">
.air-table .q-table tbody tr:nth-child(even) {
  background-color: #ffffff;
  font-weight: 300;
}

.air-table .q-table tbody tr:nth-child(even) {
  background-color: #f7f6fe;
}
</style>
