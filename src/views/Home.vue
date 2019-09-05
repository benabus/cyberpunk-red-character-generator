<template>
    <div class="home">
        <button @click="generateCharacter">Regen</button>
        <br />
        Stats:
        <pre>{{character}}</pre>
    </div>
</template>

<script>
// @ is an alias to /src

import Character from '@/character.js';

export default {
    name: "home",
    data: function(){
        return {
            character: undefined
        };
    },
    methods: {
        generateCharacter: function(){
            this.$set(this, "character", new Character());
        }
    },
    mounted: function(){
        this.generateCharacter();
        // setInterval( ()=>{
        // this.generateCharacter();
        // }, 2000);
    }
};
</script>
