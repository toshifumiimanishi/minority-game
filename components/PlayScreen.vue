<template>
  <div class="game">
    <div class="game_container">
      <div class="game_question">{{ questions[part - 1].question }}</div>
      <div class="game_answers">
        <div class="game_answer" :class="answerAClasses">
          <div>A. {{ questions[part - 1].answer.a }}</div>
          <img :src="require(`~/assets/img/question/${part.toString().padStart(2, '0')}_a.png`)" alt="">
          <div>{{ numberOfAnswerA }}</div>
        </div>
        <div class="game_answer" :class="answerBClasses">
          <div>B. {{ questions[part - 1].answer.b }}</div>
          <img :src="require(`~/assets/img/question/${part.toString().padStart(2, '0')}_b.png`)" alt="">
          <div>{{ numberOfAnswerB }}</div>
        </div>
      </div>
      <div class="game_count">{{ count }}</div>
      <button type="button" @click="computeResult" v-show="isTimeout">結果発表</button>
      <button type="button" @click="nextGame" v-show="isTimeout">次の問題</button>
    </div>
  </div>
</template>

<script>
import { playersRef } from '~/plugins/firebase'
import { mapState } from 'vuex'

const GAME_COUNT = 10

export default {
  props: ['questions'],
  data() {
    return {
      part: 1,
      count: GAME_COUNT,
    }
  },
  mounted() {
    this.startGame()
  },
  computed: {
    answerAClasses() {
      const { a, b } = this.answers
      return {
        '-win': a.length < b.length,
        '-lose': a.length > b.length,
      }
    },
    answerBClasses() {
      const { a, b } = this.answers
      return {
        '-win': a.length > b.length,
        '-lose': a.length < b.length,
      }
    },
    numberOfAnswerA() {
      return this.answers.a.length
    },
    numberOfAnswerB() {
      return this.answers.b.length
    },
    isTimeout() {
      return this.count === 0
    },
    ...mapState(['answers'])
  },
  methods: {
    countdown() {
      const totalTime = GAME_COUNT * 1000
      const oldTime = Date.now()
      const timerId = setInterval(() => {
        const currentTime = Date.now()
        const diff = currentTime - oldTime
        const remainMSec = totalTime - diff
        const remainSec = Math.ceil(remainMSec / 1000)
        this.count = remainSec
        if (remainMSec <= 0) {
          clearInterval(timerId)
        }
      }, 1000)
    },
    startGame() {
      this.countdown()
    },
    nextGame() {
      this.$store.commit('resetAnswers')
      this.count = GAME_COUNT
      this.part++
      this.startGame()
    },
    async fetchAnswers() {
      await this.$store.dispatch('pullAnswers')
    },
    compareAnswer() {
      const { a, b } = this.answers
      if (a.length < b.length) {
        return {
          winner: a,
        }
      } else if (a.length > b.length) {
        return {
          winner: b,
        }
      } else {
        return {
          winner: null,
        }
      }
    },
    addPoint(winner) {
      winner.forEach(async (id) => {
        const doc = await playersRef.doc(id).get()
        let { point } = doc.data()
        point++
        playersRef.doc(id).update({ point })
      })
    },
    async computeResult() {
      await this.fetchAnswers()
      const { winner } = this.compareAnswer()
      if (winner != null) {
        this.addPoint(winner)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.game {
  position: relative;
  display: flex;
  background-color: $base-background-color;
  height: 100vh;
}

.game_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 100%;
}

.game_question {
  margin-bottom: 96px;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
}

.game_answers {
  display: flex;
  justify-content: center;
}

.game_answer {
  display: flex;
  flex-direction: column;
  margin: 0 100px;
  width: 480px;
  height: 480px;
  font-size: 48px;
  font-weight: bold;
  text-align: center;

  > img {
    margin: 0 auto;
    width: 200px;
  }

  &.-win {
    color: $game-prime-color;
  }

  &.-lose {
    opacity: 0.4;
  }
}

.game_count {
  font-size: 60px;
  font-weight: bold;
}

button {
  margin: auto;
  padding: 4px 16px;
  border: 2px solid;
  border-radius: $base-border-radius;
  background-color: $btn-background-color;
  color: $btn-color;
  font-size: 24px;
  font-weight: bold;

  + button {
    margin-top: 12px;
  }
}
</style>
