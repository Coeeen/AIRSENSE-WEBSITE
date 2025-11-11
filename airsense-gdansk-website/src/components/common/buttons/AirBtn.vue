<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  btnType: {
    type: String,
    default: 'base',
  },
  title: {
    type: String,
    default: null,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    required: false,
    default: () => '200',
  },
  type: {
    type: String,
    required: false,
    default: () => 'base',
  },
  size: {
    type: String,
    required: false,
    default: () => 'md',
  },
  tooltip: {
    type: String,
    required: false,
  },
  customStyle: {
    required: false,
  },
})

const btnTitle = computed(() => {
  if (props.title) {
    return props.title
  }
  switch (props.btnType) {
    case 'base':
      return 'Zapisz'
    case 'base-full':
      return 'Dodaj'
    case 'login-full':
      return 'Zaloguj'
    case 'cancel':
      return 'Anuluj'
    case 'Date':
      return 'Date'
    case 'create':
      return 'create'
    default:
      return 'Zapisz'
  }
})

const btnClass = computed(() => {
  switch (props.btnType) {
    case 'base':
      return 'base'
    case 'Date':
      return 'Date'
    case 'base-full':
      return 'base-full'
    case 'login-full':
      return 'login-full'
    case 'table':
      return 'table'
    case 'transparent':
      return 'transparent'
    case 'create':
      return 'create'
    case 'rounded':
      return 'rounded'
    default:
      return 'base'
  }
})
</script>

<template>
  <div>
    <q-btn
      no-caps
      flat
      :size="size"
      :class="btnClass"
      :style="customStyle"
      :disable="props.disable"
      :type="props.type"
      class="text-bold; col-12"
      @click="(e) => emit('click', e)"
    >
      {{ btnTitle }}
    </q-btn>
    <q-tooltip v-if="tooltip">
      {{ tooltip }}
    </q-tooltip>
  </div>
</template>

<style lang="scss">
.base {
  background-color: #eff2f9 !important;
  color: #303030;
  font-weight: lighter;
  border-radius: 100px;
  width: 100%;
  min-width: 130px;
  box-shadow: 0px 2px 5px 0px #00000040;
}

.create {
  background-color: #624de3 !important;
  color: white;
  font-weight: lighter;
  border-radius: 10px;
  width: 100%;
  min-width: 130px;
  box-shadow: 0px 2px 5px 0px #00000040;
}

.Date {
  background-color: #eff2f9 !important;
  color: #303030;
  font-weight: lighter;
  border-radius: 100px;
  font-size: 10px !important;
  width: 100%;
  box-shadow: 0px 2px 5px 0px #00000040;
}

.base-full {
  background-color: #8ba9f7 !important;
  color: white;
  width: 150px;
  border-radius: 100px;
}

.transparent {
  background-color: transparent !important;
  color: #1b124c;
  width: 150px;
  border-radius: 100px;
  font-size: 8px;
  font-weight: lighter;
  letter-spacing: 1px;
}

.rounded {
  background-color: transparent !important;
  color: #1b124c !important;
  letter-spacing: 0.1rem;
  text-align: left;
  border: solid 1px #849cf6 !important;
  border-radius: 20px;
}

.table {
  border-radius: 1px;
}

.login-full {
  border-radius: 5px;
  border: 1px solid rgba(222, 235, 251, 0.3);
  width: 100%;
  background:
    linear-gradient(0deg, rgba(255, 255, 255, 0.27) 0%, rgba(255, 255, 255, 0.27) 100%),
    linear-gradient(270deg, #4b6ef2 58.51%, #4aa0f7 100%);
  box-shadow: 0px 0px 35px 0px rgba(0, 0, 0, 0.25);
  color: white;
  //width: 350px;
  //@media (max-width: 900px) {
  //  width: 725px;
  //}
  //@media (max-width: 600px) {
  //  width: 300px;
  //}
}

@media only screen and (max-width: 600px) {
  .base {
    width: 100px;
  }
  .cancel {
    width: 100px;
  }
  .outline-fixed {
    width: 100px;
  }
}
</style>
