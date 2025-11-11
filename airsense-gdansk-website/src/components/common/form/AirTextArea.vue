<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  modelValue: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: '',
  },
  debounce: {
    type: Number,
    default: 0,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  disable: {
    type: Boolean,
    default: () => false,
  },
  customClass: {
    type: String,
    required: false,
    default: () => '',
  },
  maxLengthBoolean: {
    type: Boolean,
    default: () => false,
  },
  sizeMaxLength: {
    type: Number,
    default: () => 500,
  },
})

const { label, disable, customClass, customStyle } = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const computedCustomClass = computed(() => {
  if (disable.value) {
    return 'custom-color ' + customClass.value
  }
  return customClass.value
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div :class="customClass">
    <label :htmlFor="label" style="font-size: 12px">{{ label }}</label>
    <q-input
      v-model.lazy="value"
      :debounce="debounce"
      dense
      style="border-radius: 1px"
      :style="customStyle"
      outlined
      no-error-icon
      hide-bottom-space
      type="textarea"
      :maxlength="maxLengthBoolean ? sizeMaxLength : null"
      :placeholder="placeholder"
      :rules="rules"
      :disable="disable"
      :class="computedCustomClass"
    />
    <div
      class="q-ml-xs"
      v-if="value && value.length > 0 && maxLengthBoolean"
      :class="value.length > sizeMaxLength ? 'text-red' : 'text-info'"
    >
      {{ value.length }} / {{ sizeMaxLength }}
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.q-field__control) {
  background: transparent;
}

:deep(.q-field__bottom) {
  background: transparent !important;
}

:deep(.custom-color .q-field__native) {
  color: white !important;
}

:deep(.custom-color .q-field__control) {
  background: #44474a;
}
:deep(textarea.q-field__native) {
  min-height: 170px !important;
}

:deep(.border-info) {
  border: 0.5px solid #ffffff4d;
}
</style>
