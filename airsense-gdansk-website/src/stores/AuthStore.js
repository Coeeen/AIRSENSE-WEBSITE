import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { createNotify } from 'src/utils/helperFunctions'

export const useAuthStore = defineStore('Auth', {
  state: () => ({
    user: [],
  }),
  actions: {
    async loginViaAdfs() {
      try {
        window.location.href = `https://api.asg.dev.rafal.sojecki.pl/auth/google`
        // createNotify('positive', 'Udało ci się poprawnie zalogować')
      } catch (e) {
        createNotify({ type: 'negative', message: 'bladLogowania' })
        console.error('Error in adfs:', e)
      }
    },

    async getCurrentUser() {
      try {
        const res = await api.get('/user/me')
        this.user = res.data
        return res
      } catch (e) {
        createNotify({ type: 'negative', message: 'bladZeZnalezieniemUzytkownika' })
        console.error('Error in getting user:', e)
      }
    },
    async logoutCurrentUser() {
      try {
        const res = await api.get('/auth/logout')
        return res
      } catch (e) {
        createNotify({ type: 'negative', message: 'bladWylogowania' })
        console.error('Error in logout user:', e)
      }
    },
  },
})
