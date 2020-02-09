<template>
  <section class="charsheet-style" >
    <div class="charsheet-style__block">
      <h3 class="charsheet-style__title">Clothes</h3>
      <p class="charsheet-style__content">
        {{ !emptyStyle ? appearance.clothes : '' }}
      </p>
    </div>

    <div class="charsheet-style__block">
      <h3 class="charsheet-style__title">Hair</h3>
      <p class="charsheet-style__content">
        {{ !emptyStyle ? appearance.hair : '' }}
      </p>
    </div>

    <div class="charsheet-style__block">
      <h3 class="charsheet-style__title">Affectations</h3>
      <p class="charsheet-style__content">
        {{ !emptyStyle ? appearance.affectations : '' }}
      </p>
    </div>

    <div class="charsheet-style__block">
      <h3 class="charsheet-style__title">Origin and Lang</h3>
      <p class="charsheet-style__content">
        {{ !emptyStyle ? appearance.origin : '' }}
      </p>
    </div>
  </section>
</template>

<script>
  export default {
    name: "CharStyle",
    props: ['appearance', 'emptyStyle'],
  }
</script>
