<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: '',
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
  type: {
    type: String,
    default: '',
    required: false,
  },
  disable: {
    type: Boolean,
    default: () => false,
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

const { label } = toRefs(props)

const emit = defineEmits(['update:modelValue'])

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
  <div :class="props.class">
    <label :htmlFor="label" style="font-size: 12px">{{ label }}</label>
    <q-input
      v-model.lazy="value"
      :debounce="debounce"
      :disable="disable"
      :maxlength="maxLengthBoolean ? sizeMaxLength : null"
      dense
      style="border-radius: 1px"
      outlined
      no-error-icon
      hide-bottom-space
      :placeholder="placeholder"
      :rules="rules"
      :type="type"
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
  background: transparent;
}
</style>
