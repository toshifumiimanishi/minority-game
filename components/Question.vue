<template>
  <div class="question">
    <div class="question_container">
      <h1><img src="~/assets/img/question_title.jpg" alt="問題画面"></h1>
      <form v-on:submit.prevent="answerToQuestion">
        <div class="question_fieldset">
          <input id="A" type="radio" name="answer" value="a" v-model="answer" :disabled="isReady">
          <label for="A">
            <span>A</span>
          </label>
          <input id="B" type="radio" name="answer" value="b" v-model="answer" :disabled="isReady">
          <label for="B">
            <span>B</span>
          </label>
        </div>
        <button type="submit" :disabled="isReady">回答を送信する</button>
      </form>
    </div>
    <p class="question_loading" v-show="isReady">準備中…</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      answer: '',
    }
  },
  created() {
    this.$store.dispatch('bindGamedata')
  },
  props: {
    playerId: String
  },
  computed: {
    isReady() {
      return this.gamedata.stage === 0
    },
    ...mapState(['gamedata'])
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

label {
  input:disabled + & {
    opacity: 0.7;
    color: $btn-disabled-color;
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

  &:disabled {
    opacity: 0.7;
    color: $btn-disabled-color;
  }
}

.question_loading {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: percentage(20 / 750);
  font-weight: bold;
}
</style>
