import { boot } from 'quasar/wrappers'

//Buttons
//cards
import AirCard from 'src/components/common/AirCard.vue'
import AirBtn from 'src/components/common/buttons/AirBtn.vue'
import AirIcon from 'src/components/common/buttons/AirIcon.vue'
//inputs
import AirInput from 'src/components/common/form/AirInput.vue'
import AirInputDate from 'src/components/common/form/AirInputDate.vue'
import AirSelectFilters from 'src/components/common/form/AirSelectFilters.vue'

export default boot(({ app }) => {
  app.component('air-card', AirCard)
  app.component('air-btn', AirBtn)
  app.component('air-icon', AirIcon)
  app.component('air-input', AirInput)
  app.component('air-input-date', AirInputDate)
  app.component('air-select-filters', AirSelectFilters)
})
