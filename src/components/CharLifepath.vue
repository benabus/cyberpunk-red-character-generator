<template>
  <section class="charsheet-lifepath">
    <div class="charsheet-lifepath__block">
      <h3 class="charsheet-lifepath__title">Background</h3>
      <p class="charsheet-lifepath__content">
        {{ !emptyLifePath ? lifepath.background : '' }}
      </p>
    </div>

    <div class="charsheet-lifepath__block">
      <h3 class="charsheet-lifepath__title">Motivation</h3>
      <p class="charsheet-lifepath__content">
        {{ !emptyLifePath ? lifepath.motivation : '' }}
      </p>
    </div>

    <div class="charsheet-lifepath__block">
      <h3 class="charsheet-lifepath__title">Goals</h3>
      <p class="charsheet-lifepath__content">
        {{ !emptyLifePath ? lifepath.goals : '' }}
      </p>
    </div>

    <div class="charsheet-lifepath__block">
      <h3 class="charsheet-lifepath__title">Friends</h3>
      <p class="charsheet-lifepath__content">
        <template v-if="!emptyLifePath">
          <ol v-if="lifepath.friends.length > 0">
            <li
              v-for="(friend, index) in lifepath.friends"
              :key='`friend_${index}`'
              v-text="friend"></li>
          </ol>
          <span v-else>-</span>
        </template>
      </p>
    </div>

    <div class="charsheet-lifepath__block">
      <h3 class="charsheet-lifepath__title">Enemies</h3>
      <p class="charsheet-lifepath__content">
        <template v-if="!emptyLifePath">
          <ol v-if="lifepath.enemies.length > 0">
            <li
              v-for="(friend, index) in lifepath.enemies"
              :key='`friend_${index}`'
              v-text="friend"></li>
          </ol>
          <span v-else>-</span>
        </template>
      </p>
    </div>

    <div class="charsheet-lifepath__block">
      <h3 class="charsheet-lifepath__title">Romance</h3>
      <p class="charsheet-lifepath__content">
        {{ !emptyLifePath ? lifepath.romance : '' }}
      </p>
    </div>

    <div class="charsheet-lifepath__block">
      <h3 class="charsheet-lifepath__title">Personality</h3>
      <p class="charsheet-lifepath__content">
        {{ !emptyLifePath ? lifepath.personality : '' }}
      </p>
    </div>

    <div class="charsheet-lifepath__block charsheet-lifepath__block--hide-print">
      <p class="charsheet-lifepath__more">
        Want a more extensive Lifepath?
        <router-link :to="{name: 'lifepath'}" target="_blank">Check out the 2020 Lifepath Generator</router-link>
      </p>
    </div>
  </section>
</template>

<script>
  export default {
    name: "CharLifepath",
    props: ['lifepath', 'emptyLifePath'],
  }
</script>
