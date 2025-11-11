import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { createNotify } from 'src/utils/helperFunctions'
import qs from 'qs'

export const useRaportsStore = defineStore('raports', {
  actions: {
    async getRaportsArea(data) {
      try {
        const res = await api.get('report/report', {
          params: data,
          paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
        })
        createNotify({
          type: 'positive',
          message: 'poprawniePobranoDaneDoRaportu',
        })
        return res.data
      } catch (e) {
        createNotify({
          type: 'negative',
          message: 'bladPobieraniaRaportu',
        })
        console.error('Error in Raports:', e)
      }
    },
  },
})
