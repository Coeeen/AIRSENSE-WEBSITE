<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  modelValue: {
    default: null,
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    required: true,
  },
  optionValue: {
    type: String,
    default: 'sysname',
  },
  optionLabel: {
    type: String,
    default: 'name',
  },
  rules: {
    type: Array,
    default: () => [],
  },
  disable: {
    type: Boolean,
    default: () => false,
  },
  multiple: {
    type: Boolean,
    default: () => false,
  },
})

const { placeholder, options, label, optionValue, optionLabel } = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const clearValue = () => {
  emit('update:modelValue', props.multiple ? [] : null)
}

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const humanValue = computed(() => {
  if (!options.value || !Array.isArray(options.value)) return placeholder.value

  if (props.multiple) {
    const selectedOptions = options.value.filter((x) => value.value?.includes(x[optionValue.value]))
    return selectedOptions.length
      ? selectedOptions.map((x) => x[optionLabel.value]).join(', ')
      : placeholder.value
  } else {
    if (!options.value || !Array.isArray(options.value)) return placeholder.value

    const result = options.value.find((x) => String(x[optionValue.value]) === String(value.value))

    return result ? result[optionLabel.value] : placeholder.value
  }
})
</script>

<template>
  <div>
    <label class="text-dark" :htmlFor="label" style="font-size: 12px">{{ label }}</label>
    <q-select
      v-model="value"
      dense
      outlined
      no-error-icon
      hide-bottom-space
      emit-value
      map-options
      :multiple="multiple"
      :disable="disable"
      :options="options"
      :option-value="optionValue"
      :option-label="optionLabel"
      borderless
      style="border: 1px solid #ffffff; border-radius: 5px"
      :rules="rules"
      :class="disable ? 'custom-color' : ''"
    >
      <template v-slot:selected>
        <div>
          {{ humanValue }}
        </div>
      </template>

      <template v-slot:append>
        <q-icon
          v-if="modelValue && (!Array.isArray(modelValue) || modelValue.length > 0)"
          name="close"
          class="cursor-pointer q-ml-sm"
          style="border-radius: 100%; background-color: #c5c5c5"
          color="white"
          size="xs"
          @click.stop="clearValue"
        />
      </template>
    </q-select>
  </div>
</template>

<style scoped lang="scss">
:deep(.q-field__native) {
  color: #000000;
}
</style>
