import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar'

const username = 'admin'
const password = 'czymsieGaska'

const base64Credentials = btoa(`${username}:${password}`)

console.log(import.meta.env)

const api = axios.create({
  baseURL: 'https://api.asg.dev.rafal.sojecki.pl/',
  withCredentials: true,
  headers: {
    Authorization: `Basic ${base64Credentials}`,
  },
})

let isRefreshing = false
let failedQueue = []

//Kolejka odrzuconych requestów
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(() => api(originalRequest))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await api.get('/auth/refresh')
        processQueue(null)
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        Notify.create({
          type: 'negative',
          message: 'Sesja wygasła. Zaloguj się ponownie.',
        })
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default boot(({ app }) => {
  app.config.globalProperties.$api = api
})

export { api }
