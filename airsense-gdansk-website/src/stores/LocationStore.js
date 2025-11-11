import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { createNotify } from 'src/utils/helperFunctions'

export const useLocationStore = defineStore('location', {
  actions: {
    async getAllocations() {
      try {
        const res = await api.get('/favorite')
        return res.data
      } catch (e) {
        createNotify({ type: 'negative', message: 'bladPodczasPobieraniaListyLokalizacji' })
        console.error('Error in get all locations:', e)
      }
    },

    async createLocation(data) {
      try {
        const res = await api.post('/favorite', data)
        createNotify({ type: 'positive', message: 'poprawnieDodanoLokalizacje' })
        return res
      } catch (e) {
        createNotify({ type: 'negative', message: 'bladPodczasTworzeniaLokalizacji' })
        console.error('Error in create location:', e)
      }
    },

    async updateLocation(data) {
      try {
        const res = await api.patch(`/favorite/`, data)
        createNotify({ type: 'positive', message: 'poprawnieZaktualizowanoLokalizacje' })
        return res
      } catch (e) {
        createNotify({ type: 'negative', message: 'bladPodczasAktualizacjiLokalizacji' })
        console.error('Error in update location:', e)
      }
    },

    async deleteLocation(id) {
      try {
        const res = await api.delete(`/favorite/${id}`)
        createNotify({ type: 'positive', message: 'poprawnieUsunietoLokalizacje' })
        return res
      } catch (e) {
        createNotify({ type: 'negative', message: 'bladPodczasUsuwaniaLokalizacji' })
        console.error('Error in delete location:', e)
      }
    },
  },
})
