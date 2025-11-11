<template>
  <!-- HEADER -->
  <div class="q-mb-none q-pb-none" style="background-color: #0b3721">
    <div class="row items-center justify-between q-px-md q-pt-md q-pb-none text-white">
      <div v-if="$q.screen.gt.sm">
        <img
          src="/images/AGdanskLogoWhite.svg"
          width="125px"
          alt="AirSense Logo"
          class="q-mt-md"
          style="margin-left: 10px"
        />
      </div>
      <div
        class="row Inter q-mr-xl"
        :class="$q.screen.gt.xs ? 'q-col-gutter-x-lg' : 'row col-12   justify-center '"
      >
        <div v-if="$q.screen.gt.xs" class="cursor-pointer" @click="scrollTo('technologia')">
          {{ t('menu.technologia') }}
        </div>
        <div v-if="$q.screen.gt.xs" class="cursor-pointer" @click="scrollTo('planowanie')">
          {{ t('menu.planowanie') }}
        </div>
        <div v-if="$q.screen.gt.xs" class="cursor-pointer" @click="scrollTo('FAQ')">
          {{ t('menu.faq') }}
        </div>
        <div v-if="$q.screen.gt.xs" class="cursor-pointer" @click="router.push('/map')">
          {{ t('menu.mapa') }}
        </div>
        <div
          :class="$q.screen.xs ? 'row items-center q-mr-md' : ''"
          class="cursor-pointer"
          @click="toggleLanguage"
        >
          {{ locale.toUpperCase() }}
        </div>
        <q-btn
          v-if="$q.screen.xs"
          class="SpaceGrotesk"
          :class="$q.screen.xs ? 'q-px-xs' : ''"
          no-shadow
          no-caps
          rounded
          style="background-color: rgba(255, 255, 255, 0.2); color: white"
          @click="loginViaAdfs"
          >{{ t('menu.loginBtn') }}</q-btn
        >
      </div>
      <div>
        <q-btn
          class="SpaceGrotesk"
          v-if="$q.screen.gt.xs"
          no-shadow
          no-caps
          rounded
          style="background-color: rgba(255, 255, 255, 0.2); color: white"
          @click="loginViaAdfs"
          >{{ t('menu.loginBtn') }}</q-btn
        >
      </div>

      <div class="row justify-center col-12 q-mt-xl" style="text-align: center">
        <div
          class="col-md-6 SpaceGrotesk-Bold"
          :style="{
            fontSize: $q.screen.xs
              ? '30px'
              : $q.screen.sm
                ? '40px'
                : $q.screen.md
                  ? '50px'
                  : '60px',
            lineHeight: $q.screen.xs
              ? '40px'
              : $q.screen.sm
                ? '50px'
                : $q.screen.md
                  ? '60px'
                  : '70px',
          }"
        >
          {{ t('home.sloganColor') }}<br />
          {{ t('home.slogan') }}
        </div>
        <div class="col-7 q-mt-lg Inter" style="font-size: 16px; color: rgba(255, 255, 255, 0.6)">
          {{ t('home.descOne') }}<br />
          {{ t('home.descTwo') }}
        </div>
        <div class="col-12 q-mt-lg">
          <q-btn
            @click="router.push('/map')"
            no-caps
            style="background-color: #ffffff; color: #0b3721; width: 170px"
            >{{ t('menu.sprawdzMape') }}</q-btn
          >
        </div>
        <div class="col-12 q-mt-lg">
          <img
            src="/images/HOME_APP.png"
            alt="AirSense Logo"
            style="position: relative; bottom: -10px"
            :style="{
              width: $q.screen.xs
                ? '300px'
                : $q.screen.sm
                  ? '600px'
                  : $q.screen.md
                    ? '1000px'
                    : '1000px',
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- HOME #0 -->
  <div class="row col-12 justify-center" style="background-color: #ffffff; text-align: center">
    <!-- HOME #1 -->

    <div class="row col-9 justify-around q-py-xl">
      <div class="row col-md-3 col-xs-12 column justify-center items-center q-mt-md">
        <img src="/images/HOME_ICON_BLUE.svg" alt="air icon" class="q-mb-lg" />
        <div class="Inter-bold" style="font-size: 20px">
          {{ t('home.features.f1title') }}
        </div>
        <div class="Inter q-mt-sm" style="color: rgba(18, 20, 29, 0.6); font-size: 14px">
          {{ t('home.features.f1desc') }}
        </div>
      </div>
      <div class="row col-md-3 col-xs-12 column justify-center items-center q-mt-md">
        <img src="/images/HOME_ICON_YELLOW.svg" alt="air icon" class="q-mb-lg" />
        <div class="Inter-bold" style="font-size: 20px">
          {{ t('home.features.f2title') }}
        </div>
        <div
          style="color: rgba(18, 20, 29, 0.6); font-size: 14px; letter-spacing: 0.3px"
          class="Inter q-mt-sm"
        >
          {{ t('home.features.f2desc') }}
        </div>
      </div>
      <div class="row col-md-3 col-xs-12 column justify-center items-center q-mt-md">
        <img src="/images/HOME_ICON_GREEN.svg" alt="air icon" class="q-mb-lg" />
        <div class="Inter-bold" style="font-size: 20px">
          {{ t('home.features.f3title') }}
        </div>
        <div
          class="Inter q-mt-sm"
          style="color: rgba(18, 20, 29, 0.6); font-size: 14px; letter-spacing: 0.3px"
        >
          {{ t('home.features.f3desc') }}
        </div>
      </div>
    </div>
    <div class="row col-12 justify-center items-center" style="background-color: #fafafa">
      <!-- HOME #2 -->
      <div
        id="technologia"
        class="col-md-6 col-xs-10 SpaceGrotesk-Bold q-mt-xl"
        :style="{
          fontSize: $q.screen.xs ? '30px' : $q.screen.sm ? '42px' : $q.screen.md ? '42px' : '42px',
          lineHeight: $q.screen.xs
            ? '46px'
            : $q.screen.sm
              ? '52px'
              : $q.screen.md
                ? '52px'
                : '52px',
        }"
      >
        <span class="text-white" style="background-color: #0b3721">{{
          t('home.tech.titleColor')
        }}</span>
        {{ t('home.tech.title') }}
      </div>
      <div class="row col-12 justify-between justify-center items-center">
        <div class="col-md-4 row justify-center">
          <!-- PANEL 1 -->

          <div
            class="col-md-8 col-sm-8 col-xs-10 row q-pa-md q-mt-md"
            style="box-shadow: 0px 1px 4px -2px rgba(35, 40, 105, 1); border-radius: 7px"
          >
            <div
              class="row col-2 justify-center items-center q-mr-md"
              style="background-color: #fcd7d7; border-radius: 100%; width: 50px; height: 50px"
            >
              <img src="/images/HOME_TECHNOLOGY_DATA.svg" alt="AirSense DATA" />
            </div>
            <div class="row col-9 text-left">
              <div class="Inter-bold" style="font-size: 15px">{{ t('home.tech.p1title') }}</div>
              <div class="Inter q-mt-md" style="font-size: 13px; color: rgba(18, 20, 29, 0.6)">
                {{ t('home.tech.p1desc') }}
              </div>
            </div>
          </div>
          <!-- PANEL 2 -->
          <div
            class="col-8 col-sm-8 col-xs-10 row q-pa-md q-my-lg q-mt-md"
            style="border-radius: 7px"
          >
            <div
              class="row col-2 justify-center items-center q-mr-md"
              style="background-color: #d6f0d6; border-radius: 100%; width: 50px; height: 50px"
            >
              <img src="/images/HOME_TECHNOLOGY_PERS.svg" alt="AirSense personalize" />
            </div>
            <div class="row col-9 text-left">
              <div class="Inter-bold" style="font-size: 15px">{{ t('home.tech.p2title') }}</div>
              <div class="Inter q-mt-md" style="font-size: 13px; color: rgba(18, 20, 29, 0.6)">
                {{ t('home.tech.p2desc') }}
              </div>
            </div>
          </div>
          <!-- PANEL 3 -->
          <div class="col-8 col-sm-8 col-xs-10 row q-pa-md q-mt-md" style="border-radius: 7px">
            <div
              class="row col-2 justify-center items-center q-mr-md"
              style="background-color: #c8e4fb; border-radius: 100%; width: 50px; height: 50px"
            >
              <img src="/images/HOME_TECHNOLOGY_AI.svg" alt="AirSense DATA" />
            </div>
            <div class="row col-9 text-left">
              <div class="Inter-bold" style="font-size: 15px">{{ t('home.tech.p3title') }}</div>
              <div class="Inter q-mt-md" style="font-size: 13px; color: rgba(18, 20, 29, 0.6)">
                {{ t('home.tech.p3desc') }}
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-8 col-xs-12">
          <img
            src="/images/HOME_LAPTOP_LOCATION.svg"
            alt="AirSense Laptop"
            :style="{
              width: $q.screen.xs
                ? '355px'
                : $q.screen.sm
                  ? '600px'
                  : $q.screen.md
                    ? '1000px'
                    : '1000px',
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- HOME #3 -->
  <div
    id="planowanie"
    class="row col-12 justify-beetwen items-center q-pb-xl"
    :class="$q.screen.lt.md ? 'column reverse' : ''"
    style="background-color: #ffffff"
  >
    <div class="row col-md-6 col-xs-12 justify-center items-center">
      <img
        src="/images/HOME_ROBOT_HOLIDAY.svg"
        alt="AirSense Holidays"
        :style="{
          width: $q.screen.xs
            ? '300px'
            : $q.screen.sm
              ? '500px'
              : $q.screen.md
                ? '1000px'
                : '600px',
        }"
      />
    </div>
    <div class="row col-md-5 col-xs-12 justify-center items-center SpaceGrotesk-bold text-center">
      <div
        :style="{
          fontSize: $q.screen.xs ? '30px' : $q.screen.sm ? '46px' : $q.screen.md ? '46px' : '46px',
          lineHeight: $q.screen.xs
            ? '46px'
            : $q.screen.sm
              ? '52px'
              : $q.screen.md
                ? '52px'
                : '52px',
        }"
      >
        <span style="background-color: #0b3721; color: white">{{
          t('home.planning.titleColor')
        }}</span
        >{{ t('home.planning.title') }}
      </div>
      <div
        class="Inter q-mt-md"
        style="color: rgba(18, 20, 29, 0.6); font-size: 16px"
        :style="{
          fontSize: $q.screen.xs ? '14px' : $q.screen.sm ? '16px' : $q.screen.md ? '16px' : '16px',
        }"
      >
        {{ t('home.planning.desc') }}
      </div>
    </div>
  </div>

  <!-- HOME #4 -->
  <div id="FAQ" class="row col-12 q-qt-xl" style="background-color: white">
    <div class="row col-12 justify-center items-center">
      <div style="font-size: 48px" class="SpaceGrotesk-bold">
        <span style="background-color: #0b3721; color: white">{{ t('home.faqs.title') }}</span>
      </div>
      <div
        class="col-12 justify-center items-center text-center SpaceGrotesk-Regular"
        style="font-size: 20px; color: #2e2e27"
      >
        {{ t('home.faqs.subtitle') }}
      </div>
    </div>
    <div
      class="col-12 row justify-center items-center SpaceGrotesk-Regular"
      style="color: #2e2e27 !important"
    >
      <div class="row col-md-6 col-sm-8 col-xs-10 justify-center items-center q-my-xl">
        <q-expansion-item class="col-12" :label="t('home.faqs.q1')" header-class="q-pa-md">
          <div class="q-pa-md">
            {{ t('home.faqs.a1') }}
          </div>
        </q-expansion-item>
        <q-expansion-item class="col-12" :label="t('home.faqs.q2')" header-class="q-pa-md">
          <div class="q-pa-md">
            {{ t('home.faqs.a2') }}
          </div>
        </q-expansion-item>
        <q-expansion-item class="col-12" :label="t('home.faqs.q3')" header-class="q-pa-md">
          <div class="q-pa-md">
            {{ t('home.faqs.a3') }}
          </div>
        </q-expansion-item>
        <q-expansion-item class="col-12" :label="t('home.faqs.q4')" header-class="q-pa-md">
          <div class="q-pa-md">
            {{ t('home.faqs.a4') }}
          </div>
        </q-expansion-item>
        <q-expansion-item class="col-12" :label="t('home.faqs.q5')" header-class="q-pa-md">
          <div class="q-pa-md">
            {{ t('home.faqs.a5') }}
          </div>
        </q-expansion-item>
      </div>
    </div>
  </div>
  <!-- HOME #5 -->
  <div
    class="col-12 row justify-center text-center bg-white q-pb-lg"
    style="padding-top: 80px; position: relative; z-index: 2"
  >
    <div
      class="row col-10 justify-center q-px-xl q-pt-md"
      style="background-color: #0b3721; border-radius: 10px; z-index: 2; position: relative"
    >
      <div
        class="q-mt-md SpaceGrotesk-Bold text-white col-12"
        :style="{
          fontSize: $q.screen.xs ? '30px' : $q.screen.sm ? '48px' : $q.screen.md ? '48px' : '48px',
          lineHeight: $q.screen.xs
            ? '46px'
            : $q.screen.sm
              ? '52px'
              : $q.screen.md
                ? '52px'
                : '52px',
        }"
      >
        {{ t('menu.zalogujPelnyAbyUzyskac') }}<br />
        {{ t('menu.pelnyDostep') }}
      </div>
      <div
        class="Inter-italic q-mt-md col-md-6 col-xs-10 q-mb-md"
        style="color: rgba(255, 255, 255, 0.7)"
        :style="{
          fontSize: $q.screen.xs ? '13px' : $q.screen.sm ? '16px' : $q.screen.md ? '19px' : '19px',
        }"
      >
        {{ t('menu.loginInfo') }}
      </div>
      <div class="row col-md-7 justify-center items-center q-gutter-x-md q-gutter-y-md q-pa-lg">
        <q-btn
          class="SpaceGrotesk q-pa-md q-px-xl"
          no-shadow
          no-caps
          style="background-color: white; color: black; font-size: 16px"
          @click="loginViaAdfs"
        >
          {{ t('menu.loginBtn') }}
        </q-btn>
        <q-btn
          class="SpaceGrotesk q-pa-md q-px-xl"
          no-shadow
          no-caps
          style="background-color: black; color: white; font-size: 16px"
          @click="router.push('/map')"
        >
          {{ t('menu.mapBtn') }}
        </q-btn>
      </div>
    </div>
  </div>

  <!-- HOME FOOTER -->
  <!-- eslint-disable-next-line -->
  <div
    class="col-12 row justify-center text-center Inter q-pt-xl"
    style="
      background-color: rgba(24, 24, 27, 1);
      margin-bottom: -150px;
      position: relative;
      z-index: -1;
    "
  >
    <div class="col-md-10 col-xs-12 q-pt-xl row q-mb-xl" style="color: rgba(255, 255, 255, 0.8)">
      <div
        class="col-md-8 col-xs-12 row text-center"
        :class="$q.screen.sm || $q.screen.xs ? 'justify-center q-mb-md' : ''"
      >
        <div>{{ t('home.footer.copyright') }}</div>
      </div>
      <!-- <div class="col-md-4 col-xs-12 row justify-around">
        <div>{{ t('home.footer.kontakt') }}</div>
        <div>{{ t('home.footer.regulamin') }}</div>
        <div>{{ t('home.footer.polityka') }}</div>
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/AuthStore.js'
const { t, locale } = useI18n()
const { loginViaAdfs } = useAuthStore()

//static

const router = useRouter()
const $q = useQuasar()

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const toggleLanguage = () => {
  locale.value = locale.value === 'pl' ? 'en' : 'pl'
}
</script>
