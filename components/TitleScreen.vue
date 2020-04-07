<template>
  <div class="titlescreen">
    <div class="titlescreen_content">
      <h1><img src="~/assets/img/game_title.jpg" alt="少数決ゲーム"></h1>
      <p><a href="" @click.prevent="startGame">ゲームスタート</a></p>
      <ul>
        <li class="player" v-for="player in players" :key="player.id">
          <p class="player_nickname">{{ player.nickname }}</p>
          <img class="player_img" :src="require(`~/assets/img/character/${player.characterID}.png`)" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  created() {
    this.$store.dispatch('bindGamePlayers')
  },
  computed: {
    ...mapState(['players'])
  },
  methods: {
    startGame() {
      this.$store.dispatch('nextStage')
    }
  }
}
</script>

<style lang="scss" scoped>
.titlescreen {
  position: relative;
  display: flex;
  background-color: $base-background-color;
  height: 80vh;
}

.titlescreen_content {
  margin: auto;
}

h1 {
  margin-bottom: 64px;
  text-align: center;
}

p {
  font-size: 36px;
  font-family: "ikamodoki", sans-serif;
  text-align: center;

  a {
    transition-property: opacity;
    transition-duration: $base-duration;
    transition-timing-function: $base-timing-function;

    &:hover {
      opacity: 0.7;
    }
  }
}

ul {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
}

.player {
  display: flex;
  flex-direction: column;
  margin: 0 16px;
  width: 100px;
  transform: translateY(40px);
}

.player_nickname {
  font-size: 24px;
  white-space: nowrap;
}

.player_img {
  margin: auto 0 0;
}
</style>
