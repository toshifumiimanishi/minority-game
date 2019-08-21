<template>
  <div>
    <h1>管理画面</h1>
    <ul v-for="player in players" :key="player.id">
      <li>
        <dl>
          <dt>ニックネーム：{{ player.nickname }}</dt>
          <dd>ID：{{ player.id }}</dd>
          <dd>ポイント：{{ player.point }}</dd>
        </dl>
      </li>
    </ul>
    <button type="button" v-on:click="addPoint">結果発表</button>
  </div>
</template>

<script>
import { currentGamedataRef, playersRef } from '~/plugins/firebase'
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('bindGamePlayers', playersRef)
  },
  computed: {
    ...mapState(['players', 'answers'])
  },
  methods: {
    async addPoint() {
      await this.$store.dispatch('totalAnswer')
      const { a, b } = this.answers;

      if (a.length < b.length) {
        // A が少数の場合
        a.forEach(async (id) => {
          const doc = await playersRef.doc(id).get()
          let { point } = doc.data()
          point++
          playersRef.doc(id).update({ point })
        })
      } else if (a.length > b.length) {
        // B が少数の場合
        b.forEach(async (id) => {
          const doc = await playersRef.doc(id).get()
          let { point } = doc.data()
          point++
          playersRef.doc(id).update({ point })
        })
      }
    }
  }
}
</script>
