<template>
  <div class="join">
    <div class="join_content">
      <h1 class="join_title">少数決ゲーム</h1>
      <form class="join_form" v-on:submit.prevent="joinGame">
        <input class="join_textfiled" type="text" v-model="nickname" placeholder="ニックネーム" required>
        <button class="join_button" type="submit">参加する</button>
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
  margin-bottom: 16px;
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
  border-radius: 4px;
  font-size: 16px;

  &:invalid {
    &:focus {
      border-color: rgba(#cc0000, 0.4);
    }
  }

  &:valid {
    border-color: #00d084;
  }
}

button {
  margin-top: 16px;
  border: 2px solid;
  border-radius: 4px;
  font-size: 16px;

  input:valid + & {
    border-color: #00d084;
    background-color: #00d084;
    color: #fff;
  }
}
</style>
