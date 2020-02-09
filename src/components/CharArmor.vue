<template>
  <section class="charsheet-armor">
    <h3 class="charsheet-armor__title">Armor</h3>
    <table class="charsheet-armor__table">
      <tbody>
        <tr>
          <th>Head</th>
          <td v-text="armor.head.name"></td>
          <td v-text="armor.head.sp" class="charsheet-weapons__info-number"></td>
        </tr>
        <tr>
          <th>Body</th>
          <td v-text="armor.body.name"></td>
          <td v-text="armor.body.sp" class="charsheet-weapons__info-number"></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  export default {
    name: "CharArmor",
    props: ['armor'],
  }
</script>
