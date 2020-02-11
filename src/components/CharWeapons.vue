<template>
  <section class="charsheet-weapons">
    <h3 class="charsheet-weapons__title">Weapons</h3>
    <table class="charsheet-weapons__table">
      <tbody>
        <tr v-for="(weapon, index) in weapons" :key="`weapon_${index}`">
          <td>
            {{ weapon.name }}
            {{ weapon.special && ` [${weapon.special}]` }}
          </td>
          <td v-text="weapon.damage" class="charsheet-weapons__info-number"></td>
        </tr>
        <tr v-if="weapons.length == 0">
          <td colspan="2">No Weapons.</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  export default {
    name: "CharWeapons",
    props: ['weapons'],
  }
</script>
