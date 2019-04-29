<template>
  <div>
    <h1>問題画面</h1>
    <form v-on:submit.prevent="answerToQuestion">
      <label>
        <span>A</span>
        <input type="radio" name="answer" value="a" v-model="answer">
      </label>
      <label>
        <span>B</span>
        <input type="radio" name="answer" value="b" v-model="answer">
      </label>
      <button type="submit">回答を送信する</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answer: ''
    }
  },
  props: {
    playerId: String
  },
  methods: {
    answerToQuestion() {
      this.$store.dispatch('player/sendAnswer', {
        playerId: this.playerId,
        playerAnswer: this.answer
      })
    }
  }
}
</script>
