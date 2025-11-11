<script setup>
import { computed, onMounted, ref, useSlots, watch } from 'vue'
import { useRoute } from 'vue-router'

const tableProps = defineProps({
  filter: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: false,
    default: () => {
      return []
    },
  },
  request: {
    type: Function,
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
const emit = defineEmits(['update:selectedItems', 'getRows', 'rowClick'])

const route = useRoute()
const slots = useSlots()

const loading = ref(false)
const rows = ref([])
const pagination = ref({
  sortBy: 'created_at',
  descending: false,
  page: 1,
  rowsPerPage: 50,
  rowsNumber: 10,
})

const substititeColumns = computed(() => {
  return tableProps.columns.map((x) => x.name)
})

const valueSelectedItems = computed({
  get() {
    return tableProps.selectedItems
  },
  set(value) {
    emit('update:selectedItems', value)
  },
})

const additionalProps = computed(() => {
  if (tableProps.selection) {
    return {
      selection: tableProps.selection,
    }
  } else {
    return {}
  }
})

onMounted(() => {
  onRequest(null)
})

const onRequest = (newProps) => {
  loading.value = true

  let params = {}

  if (newProps) {
    pagination.value.page = newProps.pagination.page
    pagination.value.rowsPerPage = newProps.pagination.rowsPerPage
    pagination.value.sortBy = newProps.pagination.sortBy
    pagination.value.descending = newProps.pagination.descending
  }

  params.ordering = pagination.value.descending
    ? pagination.value.sortBy
    : '-' + pagination.value.sortBy
  params.limit = pagination.value.rowsPerPage
  params.offset = pagination.value.rowsPerPage * (pagination.value.page - 1)

  params = { ...params, ...route.query, ...tableProps.filter }

  tableProps.request(params).then((response) => {
    pagination.value.rowsNumber = response.data.count
    rows.value = response.data.results
    loading.value = false
  })
}

defineExpose({
  onRequest,
})

// watchers
watch(
  () => rows.value,
  (newVal) => {
    if (newVal) {
      emit('getRows', rows.value)
    }
  },
)
</script>

<template>
  <!-- eslint-disable  -->
  <!-- TABELA JESLI BYSMY UZYWALI FILTROW Z API I SORTOWANIA -->
  <q-table
    v-model:pagination="pagination"
    v-model:selected="valueSelectedItems"
    :dense="dense"
    flat
    row-key="id"
    class="air-table"
    :rows="rows"
    :columns="columns"
    :visible-columns="visibleColumns.length > 0 ? visibleColumns : substititeColumns"
    :rows-per-page-options="[10, 15, 20, 25, 50, 100]"
    :loading="loading"
    :filter="filter"
    :grid="grid"
    :hide-header="hideHeader"
    rows-per-page-label="Wpisy na stronę"
    :pagination-label="(start, end, total) => `${start}-${end} z ${total}`"
    :no-data-label="t('brakDanichTabeli')"
    :no-results-label="t('brakDanichTabeli')"
    @request="onRequest"
    v-bind="additionalProps"
    @row-click="(evt, row, index) => emit('rowClick', evt, row, index)"
  >
    <template v-for="(_, slot) in slots" #[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
  </q-table>
</template>
<style lang="scss">
.air-table {
  background-color: #3a3d40;
  color: #c8c8c8;
}

.air-table .q-table tbody tr:hover {
  background: linear-gradient(
    to bottom,
    rgba(32, 107, 196, 0.4),
    rgba(79, 146, 225, 0.2),
    rgba(58, 61, 64, 1)
  ) !important;
  color: white;
}

.air-table .q-table tbody td {
  font-size: 12px;
  border-top: 1px solid rgba(#ffffff08, 0.1);
}

.air-table .q-table th {
  font-size: 12px;
  font-weight: bolder;
}

.air-table .q-table tbody tr:nth-child(odd) {
  background-color: #404346;
}

.q-table__control {
  span {
    color: #c8c8c8;
  }
}
</style>
