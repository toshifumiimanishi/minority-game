import { playersRef } from '~/plugins/firebase';

export const actions = {
  async addPlayer(ctx, payload) {
    const playerDocumentRef = await playersRef.add(payload)

    this.$router.push({ name: 'players-player', params: { player: playerDocumentRef.id } })
  },

  sendAnswer({ commit }, { playerId, playerAnswer }) {
    const playerDocumentRef = playersRef.doc(playerId)

    return new Promise((resolve, reject) => {
      playerDocumentRef.update({
        answer: playerAnswer
      })
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
}
