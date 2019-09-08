<template>
    <div id="app">
        <link rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossorigin="anonymous">
        <div class="p-3">
            <a href="https://cyberpunk-char-gen.neocities.org/">Cyberpunk Red Character Generator</a>
        </div>
        <router-view />

        <footer class="footer container py-3 d-flex ">
            <div>
                Content &copy; R. Talsorian Games, Inc.
                <br />
                Code &copy; Ben Serrette
            </div>
            <div>
                <a href="https://github.com/benabus/cyberpunk-red-character-generator">Contribute on Github</a>
            </div>
        </footer>
    </div>
</template>
<script>
    export default {
        mounted: function(){
            document.title="Cyberpunk Red Character Generator";
        }
    }
</script>
<style lang="scss">
</style>
