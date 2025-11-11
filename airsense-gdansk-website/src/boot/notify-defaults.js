import { Notify } from 'quasar'

export default async () => {
  Notify.setDefaults({
    color: 'black',
    position: 'top-right',
    timeout: 2500,
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }],
  })
}
