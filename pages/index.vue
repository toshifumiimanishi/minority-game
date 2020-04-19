<template>
  <div>
    <TitleScreen v-if="gamedata.stage == 0" />
    <PlayScreen v-else-if="gamedata.stage == 1" :questions="questions" :part="gamedata.part" />
  </div>
</template>

<script>
import TitleScreen from '~/components/TitleScreen';
import PlayScreen from '~/components/PlayScreen';
import { mapState } from 'vuex'

export default {
  components: {
    TitleScreen,
    PlayScreen,
  },
  asyncData() {
    return {
      questions: require('~/assets/data/questions.json')
    }
  },
  created() {
    this.$store.dispatch('bindGamedata')
  },
  computed: {
    ...mapState(['gamedata'])
  }
}
</script>
