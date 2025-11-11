<template>
            <air-card class="col-12" style="color: #1B2767">
            <template #section1>
     <div class="q-mb-md" style="font-size: 22px;">Ekologiczne nawyki</div>
        </template>             
        <template #section2>
        <q-expansion-item
      label="Jak mogę oszczędzać energię w domu?"
      icon="lightbulb"
      icon-color="primary"
      header-class="q-pa-md bg-light"
    >
      <div class="q-pa-md">
        Oszczędzanie energii w domu zaczyna się od prostych nawyków, takich jak wyłączanie światła po wyjściu z pomieszczenia, korzystanie ze światła dziennego oraz wymiana starych żarówek na energooszczędne.
      </div>
    </q-expansion-item>

    <q-expansion-item
      label="Jak dbać o wodę w codziennym życiu?"
      icon="water"
      icon-color="primary"
      header-class="q-pa-md bg-light"
    >
      <div class="q-pa-md">
        Dbaj o wodę poprzez zakręcanie jej podczas mycia zębów, naprawianie przeciekających kranów oraz stosowanie oszczędnych głowic prysznicowych. To mały wysiłek, który pomaga w oszczędzaniu zasobów.
      </div>
    </q-expansion-item>

    <q-expansion-item
      label="Jakie rozwiązania ekologiczne warto wprowadzić w ogrzewaniu domu?"
      icon="ac_unit"
      icon-color="primary"
      header-class="q-pa-md bg-light"
    >
      <div class="q-pa-md">
        Ekologiczne ogrzewanie obejmuje montaż nowoczesnych pieców, uszczelnienie domu, a także unikanie niebezpiecznych metod ogrzewania, takich jak spalanie odpadów.
      </div>
    </q-expansion-item>

    <q-expansion-item
      label="Jakie są korzyści z segregacji odpadów?"
      icon="recycling"
      icon-color="primary"
      header-class="q-pa-md bg-light"
    >
      <div class="q-pa-md">
        Segregowanie odpadów pozwala na recykling, który zmniejsza ilość śmieci trafiających na wysypiska. Segregacja w domu i w pracy to prosta metoda dbania o środowisko.
      </div>
    </q-expansion-item>

    <q-expansion-item
      label="Dlaczego warto zmniejszyć zużycie papieru?"
      icon="print"
      icon-color="primary"
      header-class="q-pa-md bg-light"
    >
      <div class="q-pa-md">
        Zmniejszenie zużycia papieru pomaga w ochronie lasów i ogranicza produkcję odpadów. Drukowanie dwustronnie oraz unikanie niepotrzebnego drukowania to małe zmiany, które mają duży wpływ na ekologię.
      </div>
    </q-expansion-item>

    <q-expansion-item
      label="Jakie rozwiązania transportowe są bardziej ekologiczne?"
      icon="directions_bike"
      icon-color="primary"
      header-class="q-pa-md bg-light"
    >
      <div class="q-pa-md">
        Wybór roweru, komunikacji miejskiej lub jazdy samochodem w sposób ekonomiczny (np. unikanie niepotrzebnego obciążenia auta) to kluczowe zmiany w kierunku ekologicznej mobilności.
      </div>
    </q-expansion-item>

    <q-expansion-item
      label="Jak dbać o instalację gazową w domu?"
      icon="gpp_good"
      icon-color="primary"
      header-class="q-pa-md bg-light"
    >
      <div class="q-pa-md">
        Regularna konserwacja instalacji gazowej oraz wentylacyjnej jest kluczowa, by uniknąć zbędnego zużycia gazu i zapewnić bezpieczeństwo. Dbaj o jej stan, aby była bardziej efektywna.
      </div>
    </q-expansion-item>

    <q-expansion-item
      label="Jakie ekologiczne rozwiązania warto zastosować w ogrodzie?"
      icon="grass"
      icon-color="primary"
      header-class="q-pa-md bg-light"
    >
      <div class="q-pa-md">
        Zamiast tradycyjnej kosiarki spalinowej, warto rozważyć kosiarkę elektryczną. Z kolei grill gazowy zamiast węglowego jest bardziej ekologiczną opcją. Pamiętaj także o przechowywaniu farb w szczelnych pojemnikach, aby uniknąć ich wypuszczania do środowiska.
      </div>
    </q-expansion-item>

    <q-expansion-item
      label="Jakie działania mogę podjąć, aby poprawić jakość powietrza wokół domu?"
      icon="cloud"
      icon-color="primary"
      header-class="q-pa-md bg-light"
    >
      <div class="q-pa-md">
        Sadzenie roślin wokół domu i wspieranie akcji sadzenia drzew w swojej okolicy pomaga w poprawie jakości powietrza. Rośliny pochłaniają dwutlenek węgla i wytwarzają tlen, co wpływa na zdrowie nas wszystkich.
      </div>
    </q-expansion-item>

    <q-expansion-item
      label="Dlaczego warto wspierać lokalnych producentów?"
      icon="local_florist"
      icon-color="primary"
      header-class="q-pa-md bg-light"
    >
      <div class="q-pa-md">
        Wybieranie produktów od lokalnych producentów to nie tylko wsparcie dla lokalnej gospodarki, ale także pomoc w ochronie środowiska. Produkty ekologiczne są często zdrowsze i bardziej przyjazne naturze.
      </div>
    </q-expansion-item>
    </template>
    </air-card>
</template>
<script setup>
import AirCard from 'src/components/common/AirCard.vue';
</script>