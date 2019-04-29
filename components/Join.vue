<template>
  <div>
    <h1>参加画面</h1>
    <form v-on:submit.prevent="joinGame">
      <input type="text" v-model="nickname" placeholder="ニックネーム">
      <button type="submit">参加する</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: ''
    }
  },
  methods: {
    joinGame() {
      this.$store.dispatch('player/addPlayer', {
        nickname: this.nickname,
        point: 0,
        answer: ''
      })
    }
  }
}
</script>
