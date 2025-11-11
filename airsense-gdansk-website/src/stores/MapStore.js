import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { createNotify } from 'src/utils/helperFunctions'
import qs from 'qs'

export const useMapStore = defineStore('map', {
  actions: {
    async getMeasurementPoint(data) {
      try {
        const res = await api.get('/measurement/point', { params: data })
        return res
      } catch (e) {
        console.error('Error in getMeasurementPoint:', e)
        createNotify({
          type: 'negative',
          message: 'brakDanych',
        })
      }
    },

    async getMeasurementArea(data) {
      try {
        const res = await api.get('/measurement/area', {
          params: data,
          paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
        })
        console.log('Response from getMeasurementArea:', res.data.length)
        if (res.data.length === 0) {
          createNotify({
            type: 'positive',
            message: 'poprawnieBrakDanych',
          })
        }

        return res
      } catch (e) {
        createNotify({
          type: 'negative',
          message: 'brakDanych',
        })
        console.error('Error in getMeasurementArea:', e)
      }
    },
  },
})
