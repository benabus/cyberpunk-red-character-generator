<template>
    <div class="home">
        <div v-if="character"
             class="container-fluid">

            <div class="card mb-3 p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <!-- <div class="col-2">
                        <img class="img-fluid"
                             :src="`https://thispersondoesnotexist.com/image?${Object.values(character.stats).join('-')}`" />
                    </div> -->
                    <h2 class=""><span>{{character && character.role}}</span></h2>

                    <div class=" d-flex pb-3 flex-wrap">
                        <button class="btn btn-outline-primary"
                                @click="chosen_role = character.role; set_role = !set_role;">Set Role</button>
                        <div class="mx-3">
                            <select v-if="set_role"
                                    class="form-control"
                                    v-model="chosen_role">
                                <option v-for="role in role_options"
                                        :key='`role_option_${role}`'>{{role}}</option>
                            </select>
                        </div>
                        <button class="btn btn-primary"
                                @click="generateCharacter">Regen</button>
                    </div>
                </div>
                <div>
                    Name: {{character.name}}
                </div>
                <div class="row">
                    <div class="col-12">
                        <table class="table table-responsive-sm">
                            <thead>
                                <tr>
                                    <th class="text-center"
                                        v-for="stat in Object.keys(stats)"
                                        :key="`head_${stat}`">
                                        {{stat.toUpperCase()}}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center"
                                        v-for="(stat, type) in stats"
                                        :key="type">
                                        {{stat}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="col-4 text-center">
                        <div class="card p-3">
                            Starting Hit Points
                            <br />
                            <b v-text="character.starting_hits"></b>
                        </div>
                    </div>
                    <div class="col-4 text-center">
                        <div class="card p-3">
                            Seriously Wounded
                            <br />
                            <b v-text="character.seriously_wounded"></b>
                        </div>
                    </div>
                    <div class="col-4 text-center">
                        <div class="card p-3">
                            Death Save
                            <br />
                            <b v-text="character.death_save"></b>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-7 mb-3">
                    <div class="card p-3 mb-3">
                        <div class="d-flex justify-content-between">
                            <h3>Skills</h3>
                            <div>
                                Reputation: <b>{{character.reputation}}</b>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4 pb-3 d-flex"
                                 v-for="(skill, index) in character.skills"
                                 :key="`skill_${index}`">
                                <div class="text-center card flex-fill p-2">
                                    <div><strong v-text="skill.name"></strong></div>
                                    <div>{{skill.stat}} + {{skill.modifier}} (<b>{{stats[skill.stat.toLowerCase()] + skill.modifier}}</b>)</div>
                                    <div><small>{{skill.description}}</small></div>
                                </div>
                            </div>
                            <div class="col"
                                 v-if="character.skills.length == 0">
                                No Skills :(
                            </div>
                        </div>
                    </div>

                    <div class="card p-3">
                        <h3>Life Path</h3>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>Background</th>
                                    <td v-text="character.lifepath.background"></td>
                                </tr>
                                <tr>
                                    <th>Motivation</th>
                                    <td v-text="character.lifepath.motivation"></td>
                                </tr>
                                <tr>
                                    <th>Goals</th>
                                    <td v-text="character.lifepath.goals"></td>
                                </tr>
                                <tr>
                                    <th>Friends</th>
                                    <td>
                                        <ol class="m-0 pl-3"
                                            v-if="character.lifepath.friends.length > 0">
                                            <li v-for="(friend, index) in character.lifepath.friends"
                                                :key='`friend_${index}`'
                                                v-text="friend"></li>
                                        </ol>
                                        <span v-else>None</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Enemies</th>
                                    <td>

                                        <ol class="m-0 pl-3"
                                            v-if="character.lifepath.enemies.length > 0">
                                            <li v-for="(enemy, index) in character.lifepath.enemies"
                                                :key='`enemy_${index}`'
                                                v-text="enemy"></li>
                                        </ol>
                                        <span v-else>None</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Romance</th>
                                    <td v-text="character.lifepath.romance"></td>
                                </tr>
                                <tr>
                                    <th>Personality</th>
                                    <td v-text="character.lifepath.personality"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-12 col-md-5 mb-3">
                    <div class="card p-3 mb-3">
                        <h3>Armor</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Type</th>
                                    <th>SP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Head</th>
                                    <td v-text="character.armor.head.name"></td>
                                    <td v-text="character.armor.head.sp"></td>
                                </tr>
                                <tr>
                                    <th>Body</th>
                                    <td v-text="character.armor.body.name"></td>
                                    <td v-text="character.armor.body.sp"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="card p-3 mb-3">
                        <h3>Weapons</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Damage</th>
                                    <th>Special</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(weapon, index) in character.weapons"
                                    :key="`weapon_${index}`">
                                    <td v-text="weapon.name"></td>
                                    <td v-text="weapon.damage"></td>
                                    <td v-text="weapon.special || '-'"></td>
                                </tr>
                                <tr v-if="character.weapons.length == 0">
                                    <td colspan="3">No Weapons.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="card p-3">
                        <h3>Cyberware</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(cyberware, index) in character.cyberware"
                                    :key="`cyberware_${index}`">
                                    <td v-text="cyberware.name"></td>
                                    <td v-text="cyberware.description"></td>
                                </tr>
                                <tr v-if="character.cyberware.length == 0">
                                    <td colspan="2">No Cyberware.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="card p-3 mt-3">
                        <h3>Gear</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in character.gear"
                                    :key="`cyberware_${index}`">
                                    <td v-text="item.name"></td>
                                    <td v-text="item.description"></td>
                                </tr>
                                <tr v-if="character.gear.length == 0">
                                    <td colspan="2">No Gear.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Character from "@/character.js";
import Database from "@/database";

export default {
    name: "home",
    data: function() {
        return {
            character: undefined,
            set_role: false,
            chosen_role: ""
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
        }
    },
    mounted: function() {
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
    }
};
</script>
