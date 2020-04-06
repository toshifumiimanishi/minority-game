<template>
  <div>
    <TitleScreen v-if="gamedata.stage == 0" />
    <GameScreen v-else-if="gamedata.stage == 1" />
  </div>
</template>

<script>
import TitleScreen from '~/components/TitleScreen';
import GameScreen from '~/components/GameScreen';
import { mapState } from 'vuex'

export default {
  components: {
    TitleScreen,
    GameScreen,
  },
  created() {
    this.$store.dispatch('bindGamedata')
  },
  computed: {
    ...mapState(['gamedata'])
  }
}
</script>
