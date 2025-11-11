<script setup>
import { computed, ref, toRefs } from "vue";

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
    default: "",
  },
  options: {
    type: Array,
    required: true,
  },
  optionValue: {
    type: String,
    default: "sysname",
  },
  optionLabel: {
    type: String,
    default: "name",
  },
  rules: {
    type: Array,
    default: () => [],
  },
  borderless: {
    type: Boolean,
    default: () => false,
  },
  rounded: {
    type: Boolean,
    default: () => false,
  },
  disable: {
    type: Boolean,
    default: () => false,
  },

});

const { placeholder, options, label, optionValue, optionLabel } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

// const humanValue = computed(() => {
//   try {
//     return value.value
//       ? options.value.find((x) => x[optionValue.value] === value.value)[
//           optionLabel.value
//         ]
//       : placeholder.value;
//   } catch {
//     return "";
//   }
// });

const filteredOptions = ref(options.value.slice());

const filterFn = (val, update) => {
  const needle = val.toLowerCase();
  update(() => {
    filteredOptions.value = options.value.filter((option) =>
      option[optionLabel.value].toLowerCase().includes(needle)
    );
  });
};
</script>

<template>
  <div>
    <label class="text-info" :htmlFor="label" style="font-size: 12px">{{
      label
    }}</label>
    <q-select
      v-model="value"
      dense
      clearable
      use-input
      no-error-icon
      hide-bottom-space
      emit-value
      map-options
      :borderless="borderless"
      :rounded="rounded"
      color="dark"
      :disable="disable"
      style="color: #000000;"
      :options="filteredOptions"
      @filter="filterFn"
      :placeholder="value ? null : placeholder"
      :option-value="optionValue"
      :option-label="optionLabel"
      :rules="rules"
      :class="disable ? 'custom-color' : ''"
    >
    <template v-slot:prepend >
          <q-icon name="search" class="q-ml-sm" />
        </template>

    <template v-slot:selected>
        <div class="q-ml-xs" :class="disable ? 'text-info' : 'custom-color'">
          {{ humanValue }}
        </div>
      </template>
    </q-select>
  </div>
</template>

<style scoped lang="scss">
:deep(.q-field__control) {
  background: #F6F6F6;
  color: #000000;
  border-radius: 20px;
}

:deep(.q-field__native) {
  color: #000000;
}

:deep(.q-field__bottom) {
  background: transparent !important;
}

:deep(.custom-color .q-field__control) {
  background: #F6F6F6;
}
</style>
