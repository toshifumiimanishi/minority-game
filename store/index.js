import { currentGamedataRef, playersRef } from '~/plugins/firebase';
import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  players: [],
  answers: {
    a: [],
    b: [],
  },
  gamedata: {},
})

export const mutations = {
  updateAnswers(state, payload) {
    state.answers = payload
  },
  resetAnswers(state) {
    state.answers = {
      a: [],
      b: [],
    }
  },
  ...vuexfireMutations
}

export const actions = {
  bindGamedata: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('gamedata', currentGamedataRef)
  }),
  bindGamePlayers: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('players', playersRef)
  }),
  async pullAnswers({ commit }) {
    let answers = {}
    let a = []
    let b = []

    const querySnapshot = await playersRef.get()

    querySnapshot.forEach((doc) => {
      const playerId = doc.id
      const { answer } = doc.data()

      if (answer === 'a') {
        a.push(playerId)
      } else if (answer === 'b') {
        b.push(playerId)
      }

      answers = { a, b }
    })

    commit('updateAnswers', answers)
  }
}
