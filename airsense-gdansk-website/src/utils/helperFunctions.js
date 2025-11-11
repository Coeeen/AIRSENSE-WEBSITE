import { Notify } from 'quasar'
import { i18n } from 'src/boot/i18n'

const createNotify = (notifyOptions) => {
  const t = i18n.global.t
  console.log('notifyOptions:', notifyOptions)

  const config = {
    classes: `notify-${notifyOptions.type}`,
    message: notifyOptions.message ? t(notifyOptions.message) : '',
    caption: notifyOptions.caption ? t(notifyOptions.caption) : '',
    badgeColor: notifyOptions.type,
    badgeTextColor: 'white',
  }

  Notify.create(config)
}

export { createNotify }
