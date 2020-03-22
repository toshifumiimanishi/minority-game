<template>
  <div class="join">
    <div class="join_content">
      <h1 class="join_title">少数決ゲーム</h1>
      <form class="join_form" v-on:submit.prevent="joinGame">
        <input class="join_textfiled" type="text" v-model="nickname" placeholder="ニックネーム" required>
        <button class="join_button" type="submit" :disabled="!canJoin">参加する</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: ''
    }
  },

  computed: {
    canJoin() {
      const canJoin = this.nickname.length > 0;
      return canJoin;
    }
  },

  methods: {
    joinGame() {
      this.$store.dispatch('player/addPlayer', {
        nickname: this.nickname,
        point: 0,
        answer: ''
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.join {
  display: flex;
  background-color: #ccc;
  height: 100vh;
}

.join_content {
  margin: auto;
}

h1 {
  margin-bottom: 12px;
  font-size: 24px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  display: block;
  border: 2px solid;
  padding: 4px;
  border-radius: $base-border-radius;
  font-size: 16px;

  &:valid {
    border-color: $input-success-border-color;
  }
}

button {
  margin-top: 20px;
  padding: 4px 16px;
  border: 2px solid;
  border-radius: $base-border-radius;
  font-size: 16px;
  font-weight: bold;

  input:valid + & {
    border-color: $btn-success-border-color;
    background-color: $btn-success-background-color;
    color: $btn-success-color;
  }
}
</style>
