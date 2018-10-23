<template>
    <div id="app">
        <MainItems/>
    </div>
</template>

<style>
    * {
        box-sizing: border-box;
    }

    body {
        background: black;
        color: #CCC;
        font-family: Tahoma, serif;
        font-size: 15px;
    }

    a:link, a:visited {
        color: #CCC;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import MainItems from "./views/MainItems.vue";

    @Component({
        components: {MainItems}
    })
    export default class App extends Vue {
    }
</script>