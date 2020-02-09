<template>
  <div class="charsheet-generator" v-if="character" >

    <!-- Header Buttons -->
    <section class="charsheet-header">
      <div class="charsheet-header__roles">
        <button class="button" @click="chosen_role = character.role; set_role = !set_role;">
          Set Role
        </button>
        <select v-if="set_role" v-model="chosen_role" class="select-input">
          <option v-for="role in role_options" :key='`role_option_${role}`'>{{role}}</option>
        </select>
      </div>
      <div class="charsheet-header__actions">
        <button class="button button--white" @click="generateCharacter">Regen</button>
        <button class="button button--white" @click="toggleEdit">
          {{ !edit ? 'Edit' : 'Save' }}
        </button>
        <a
          class="button button--white"
          href="https://drive.google.com/file/d/1o84Y9-X3tsIU6cfk_hd0JD3pkM19bSi3/view?usp=drivesdk"
          target="_blank"
        >
          Blank Sheet
        </a>
      </div>
    </section>
    <!-- End Header Buttons -->

    <!-- Top Stats -->
    <section class="charsheet-stats">
      <char-base-info :character='character' :stats='stats' :edit='edit'/>

      <char-health
        :starting_hits='character.starting_hits'
        :seriously_wounded='character.seriously_wounded'
        :death_save='character.death_save'
      />
    </section>
    <!-- End Top Stats -->

    <div class="charsheet-bottom">
      <div class="charsheet-bottom__column">
        <!-- Skills -->
        <char-skills :skills='character.skills' :stats='character.stats' />
        <!-- End Skills -->

        <!-- Char Lifepath -->
        <char-lifepath :lifepath='character.lifepath' />
        <!-- End Char Lifepath -->

        <!-- Char Style -->
        <char-style :appearance='character.appearance' :emptyStyle='emptyStyle' v-if="renderStyle" />
        <!-- End Char Style -->
      </div>
      <div class="charsheet-bottom__column">
        <!-- Char Armor -->
        <char-armor :armor='character.armor' />
        <!-- End Char Armor -->

        <!-- End Char Weapons -->
        <char-weapons :weapons='character.weapons' />
        <!-- End Char Weapons -->

        <!-- End Char Items -->
        <char-items :cyberware='character.cyberware' :gear='character.gear' />
        <!-- End Char Items -->
      </div> <!-- .charsheet-bottom__column -->
    </div><!-- charsheet-bottom -->

  </div>
</template>

<script>
import Character from "@/character.js";
import Database from "@/database";

// Components
import CharBaseInfo from "@/components/CharBaseInfo.vue";
import CharHealth from "@/components/CharHealth.vue";
import CharSkills from "@/components/CharSkills.vue";
import CharLifepath from "@/components/CharLifepath.vue";
import CharStyle from "@/components/CharStyle.vue";
import CharArmor from "@/components/CharArmor.vue";
import CharWeapons from "@/components/CharWeapons.vue";
import CharItems from "@/components/CharItems.vue";

export default {
    name: "home",
    components: {
      CharBaseInfo,
      CharHealth,
      CharSkills,
      CharLifepath,
      CharStyle,
      CharArmor,
      CharWeapons,
      CharItems
    },
    data: function() {
      return {
        character: undefined,
        set_role: false,
        chosen_role: "",
        edit: false,
        renderPhoto: false,
        renderStyle: true,
        emptyLifePath: false,
        emptyStyle: false,
      };
    },
    computed: {
      stats: function() {
        return (this.character && this.character.stats) || {};
      },
      role_options: function() {
        return Database.roles;
      }
    },
    methods: {
      generateCharacter: function() {
        let char_options = {};
        if (this.set_role) {
            char_options.role = this.chosen_role;
        }
        let char = new Character(char_options);
        this.$set(this, "character", char);
        this.$router.push("/" + this.character.encode64());
      },
      toggleEdit: function() {
        this.edit = !this.edit;
        this.character.recalculate();
        if (!this.edit) {
          // Update link based on changes
          this.$router.push("/" + this.character.encode64());
        }
      }
    },
    mounted: function() {
      // let base64 = false;
      let base64 = this.$route.params.base64;
      // console.debug(base64);
      if (base64) {
          this.$set(this, "character", new Character(base64));
      } else {
          this.generateCharacter();
      }
      // setInterval( ()=>{
      // this.generateCharacter();
      // }, 2000);
      console.debug(this.character);
    }
};
</script>
