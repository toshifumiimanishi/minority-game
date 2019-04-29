<template>
  <div>
    <join v-if="!$route.params.player" />
    <question v-else v-bind:player-id="$route.params.player" />
  </div>
</template>

<script>
import Join from '../../components/Join'
import Question from '../../components/Question'

export default {
  data() {
    return {
    }
  },
  components: {
    Join,
    Question
  }
}
</script>
