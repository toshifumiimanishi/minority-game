<template>
  <div class="titlescreen">
    <div class="titlescreen_content">
      <h1><img src="~/assets/img/game_title.jpg" alt="少数決ゲーム"></h1>
      <p>プレイヤーうけつけちゅう…</p>
      <ul>
        <li class="player" v-for="player in players" :key="player.id">
          <p class="player_nickname">{{ player.nickname }}</p>
          <img :src="require(`~/assets/img/character/${player.characterID}.png`)" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { playersRef } from '~/plugins/firebase'
import { mapState } from 'vuex'

export default {
  created() {
    this.$store.dispatch('bindGamePlayers', playersRef)
  },
  computed: {
    ...mapState(['players'])
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
}

ul {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.player {
  margin: 0 16px;
  width: 100px;
  transform: translateY(40px);
}

.player_nickname {
  font-size: 24px;
  white-space: nowrap;
}
</style>
