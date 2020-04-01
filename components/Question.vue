<template>
  <div class="question">
    <div class="question_container">
      <h1><img src="~/assets/img/question_title.jpg" alt="問題画面"></h1>
      <form v-on:submit.prevent="answerToQuestion">
        <div class="question_fieldset">
          <input id="A" type="radio" name="answer" value="a" v-model="answer">
          <label for="A">
            <span>A</span>
          </label>
          <input id="B" type="radio" name="answer" value="b" v-model="answer">
          <label for="B">
            <span>B</span>
          </label>
        </div>
        <button type="submit">回答を送信する</button>
      </form>
    </div>
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

<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  background-color: $base-background-color;
  height: 100vh;
}

.question_container {
  margin: auto percentage(20 / 750);
}

h1 {
  margin: 0 auto 20px;
  width: 80%;
}

.question_fieldset {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  width: 40%;
  border-radius: $base-border-radius;
  background-color: $label-background-color;
  color: $label-color;
  font-size: 36px;
  font-weight: bold;
  text-align: center;

  :checked + & {
    background-color: $label-checked-background-color;
    color: $input-success-color;
  }
}

button {
  margin-top: 20px;
  padding: 4px 16px;
  border: 2px solid;
  border-radius: $base-border-radius;
  background-color: $btn-background-color;
  color: $btn-color;
  font-size: 16px;
  font-weight: bold;
}
</style>
