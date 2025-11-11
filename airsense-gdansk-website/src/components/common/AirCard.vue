<template>
    <div :class="customClass">
      <q-card
        :class="cardType"
        class="q-mt-md"
        style="
          padding: 20px;
          -webkit-box-shadow: 0px -0px 10px 0px rgba(100, 121, 150, 0.25);
          -moz-box-shadow: 0px -0px 10px 0px rgba(100, 121, 150, 0.25);
          box-shadow: 0px -0px 10px 0px rgba(100, 121, 150, 0.25);
        "
      >
        <slot name="section1"></slot>
        <slot name="section2"></slot>
        <slot name="section3"></slot>
        <slot name="actions"></slot>
      </q-card>
      <slot name="bottom"></slot>
    </div>
  </template>
  
  <script setup>
  import { toRefs } from "vue";
  const props = defineProps({
    customClass: {
      type: String,
      required: false,
      default: "",
    },
    cardType: {
      type: String,
      required: false,
      default: () => "white",
    },
  });
  
  const { customClass } = toRefs(props);
  </script>
  
  <style lang="scss" scoped>
  .normal {
    background-color: #474b53;
  }
  
  .white {
    background: white;
    width:100%;
  }
  
  .login {
    background: linear-gradient(
      106.03deg,
      #edf4fe 1.46%,
      #f6f6ff 51.9%,
      #edf4fe 98.54%
    );
    margin: 20px;
    min-width: 700px;
    border-radius: 25px;
    @media (max-width: 600px) {
      min-width: 300px;
    }
  }
  
  .forgotPassword {
    background: linear-gradient(
      106.03deg,
      #edf4fe 1.46%,
      #f6f6ff 51.9%,
      #edf4fe 98.54%
    );
    margin: 20px;
    max-width: 700px;
    border-radius: 25px;
    @media (max-width: 600px) {
      min-width: 300px;
    }
  }
  
  .popupCard {
    max-width: 700px;
    background-image: url("~assets/img/WWP.svg");
  }
  
  .table {
    background: white;
    border-radius: 5px;
  }
  
  .descPopup {
    background: #f3f5ff;
  }
  
  .no-padding {
    padding: 0px;
  }
  </style>
  