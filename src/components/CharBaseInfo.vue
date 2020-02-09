<template>
  <div class="charsheet-stats__top-info">
    <div
      class="charsheet-stats__char-photo"
      v-if="renderPhoto"
      v-bind:style="{ 'background-image': `url(https://thispersondoesnotexist.com/image?${Object.values(character.stats).join('-')})` }"
    ></div>

    <div class="charsheet-stats__base-info">
      <h2 class="charsheet-stats__name">
        {{character.name}}, {{character && character.role}}
        <small>(Reputation: {{ character.reputation }})</small>
      </h2>

      <div class="charsheet-stats__stats-row">
        <div v-for="(stat, type) in stats" :key="type" class="charsheet-stats__data-block">
          <span class="charsheet-stats__data-info charsheet-stats__data-info--type">{{ type }}</span>
          <span v-if="!edit" class="charsheet-stats__data-info">{{ stat }}</span>
          <input v-else type="number" class="charsheet-stats__data-info charsheet-stats__data-info--edit" v-model="character.stats[type]" max="9" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CharBaseInfo",
    props: ['character', 'stats', 'edit', 'renderPhoto'],
  }
</script>
