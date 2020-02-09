<template>
  <div class="charsheet-stats__health-row">
    <div class="charsheet-stats__data-block">
      <span class="charsheet-stats__data-info charsheet-stats__data-info--type">Starting Hit Points</span>
      <span class="charsheet-stats__data-info" v-text="starting_hits"></span>
    </div>

    <div class="charsheet-stats__data-block">
      <span class="charsheet-stats__data-info charsheet-stats__data-info--type">Seriously Wounded</span>
      <span class="charsheet-stats__data-info" v-text="seriously_wounded"></span>
    </div>

    <div class="charsheet-stats__data-block">
      <span class="charsheet-stats__data-info charsheet-stats__data-info--type">Death Save</span>
      <span class="charsheet-stats__data-info" v-text="death_save"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CharHealth",
    props: ['starting_hits', 'seriously_wounded', 'death_save'],
  }
</script>
