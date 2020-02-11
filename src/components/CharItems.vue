<template>
  <section class="charsheet-items">
    <div class="charsheet-items__column">
      <h3 class="charsheet-items__title">Cyberwear</h3>
      <div v-for="(cyberware, index) in cyberware" :key="`cyberware_${index}`" class="charsheet-items__item">
        <h4 v-text="cyberware.name"></h4>
        <p v-text="cyberware.description"></p>
      </div>
    </div>

    <div class="charsheet-items__column">
      <h3 class="charsheet-items__title">Gear</h3>
      <div v-for="(gear, index) in gear" :key="`gear_${index}`" class="charsheet-items__item">
        <h4 v-text="gear.name"></h4>
        <p v-text="gear.description"></p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "CharItems",
    props: ['cyberware', 'gear'],
  }
</script>
