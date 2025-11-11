<script setup>
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const props = defineProps({
  iconName: {
    type: String,
    required: false,
    default: 'CALENDAR_DRAWLER',
  },
  label: {
    type: String,
    default: null,
  },
  modelValue: {
    type: String,
    default: null,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  disable: {
    type: Boolean,
    default: () => false,
  },
  options: {
    type: Function,
    required: false,
  },
})

const { label, iconName } = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const iconURL = computed(() => {
  return new URL(`/src/assets/${iconName.value}.svg`, import.meta.url).href
})

//musze nadpisac locale aby byl polski
const polishLocale = {
  days: 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
  daysShort: 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
  months:
    'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split(
      '_',
    ),
  monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
  firstDayOfWeek: 1,
  format24h: true,
  pluralDay: 'dni',
}

const englishLocale = {
  days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  months:
    'January_February_March_April_May_June_July_August_September_October_November_December'.split(
      '_',
    ),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  firstDayOfWeek: 0,
  format24h: false,
  pluralDay: 'days',
}

const currentLocale = computed(() => {
  return locale.value === 'pl' || locale.value === 'pl-PL' ? polishLocale : englishLocale
})
</script>

<template>
  <div>
    <label class="text-white" :htmlFor="label" style="font-size: 12px">{{ label }}</label>
    <q-input
      v-model="value"
      dense
      style="border-radius: 1px"
      placeholder="RRRR/MM/DD"
      outlined
      no-error-icon
      input-style="color:"
      hide-bottom-space
      :disable="disable"
      :rules="rules"
      :class="disable ? 'disable-color' : ''"
    >
      <template v-slot:append>
        <q-icon :name="'img:' + iconURL" class="cursor-pointer" size="xs">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="value"
              mask="YYYY-MM-DD"
              color="dark"
              :options="options"
              :locale="currentLocale"
            >
              <div class="row items-center justify-end text-info">
                <air-btn v-close-popup btn-type="square" title="Zamknij" />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<style scoped lang="scss">
:deep(.q-field__control) {
  background: white;
}

:deep(.q-field__native) {
  color: #3a3d40;
}

:deep(.q-field__bottom) {
  background: transparent !important;
}

:deep(.disable-color .q-field__native) {
  color: white !important;
}

:deep(.disable-color .q-field__control) {
  background: transparent;
}
</style>
