import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formData: {},
    firebaseData: {},
    formProgress: {},
  },
  getters: {
    progress: state => {
      if (state.formProgress) {
        return state.formProgress.progress || 0
      }
      return 0
    },
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    bindFirebaseData: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('firebaseData', db.collection('forms').doc('example'))
    }),
    bindFormProgress: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('formProgress', db.collection('progress').doc('example'))
    }),
    autosaveForm: firestoreAction((context, payload) => {
      return db.collection('forms')
        .doc('example')
        .set({ ...payload }, { merge: true })
    }),
  }
})