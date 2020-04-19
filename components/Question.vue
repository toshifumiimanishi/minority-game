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
        <button type="submit" :class="buttonClasses" :disabled="!canAnswer">
          {{ buttonLabel }}
        </button>
      </form>
    </div>
    <p class="question_loading" v-show="isReady">準備中…</p>
    <p class="question_loading" v-show="isProcessing">送信中…</p>
  </div>
</template>

<script>
import { currentGamedataRef } from '~/plugins/firebase'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      answer: '',
      isProcessing: false,
      isAnswered: false,
    }
  },
  created() {
    this.$store.dispatch('bindGamedata')
  },
  mounted() {
    currentGamedataRef.onSnapshot((doc) => {
      if (this.isAnswered) {
        this.resetAnswer()
      }
    })
  },
  props: {
    playerId: String
  },
  computed: {
    buttonLabel() {
      return this.isAnswered ? '回答済み' : '回答を送信する'
    },
    buttonClasses() {
      return {
        '-answered': this.isAnswered
      }
    },
    isReady() {
      return this.gamedata.stage === 0
    },
    canAnswer() {
      return !this.isReady && this.answer.length > 0
    },
    ...mapState(['gamedata'])
  },
  methods: {
    answerToQuestion() {
      if (this.isAnswered || this.isProcessing) {
        return
      }

      this.isProcessing = true
      this.$store.dispatch('player/sendAnswer', {
        playerId: this.playerId,
        playerAnswer: this.answer
      })
      .then(() => {
        this.isProcessing = false
        this.isAnswered = true
      })
      .catch((error) => {
        console.error(error)
      })
    },
    resetAnswer() {
      this.answer = ''
      this.isAnswered = false
    }
  }
}
</script>

<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  background-color: $base-background-color;
  min-height: 100vh;
}

.question_container {
  margin: auto percentage(20 / 750);
}

h1 {
  margin: 0 auto 20px;
  width: 80%;
  text-align: center;
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

  &.-answered {
    border-color: $btn-success-border-color;
    background-color: $btn-success-background-color;
    color: $btn-success-color;
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
