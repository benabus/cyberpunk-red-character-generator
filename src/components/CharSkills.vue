<template>
  <section class="charsheet-skills">
    <h3 class="charsheet-skills__title">Skills</h3>
    <div class="charsheet-skills__content">
      <div class="charsheet-skills__skill-block" v-for="(skill, index) in skills" :key="`skill_${index}`" v-bind:title="skill.description">
        <h4 class="charsheet-skills__skill-name">{{ skill.name }}</h4>
        <p>
          {{skill.stat}} + {{skill.modifier}}
          <b v-if="showSkillTotal">({{(parseInt(stats[skill.stat.toLowerCase()]) || 0) + skill.modifier}})</b>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "CharSkills",
    props: ['skills', 'stats', 'showSkillTotal'],
  }
</script>
