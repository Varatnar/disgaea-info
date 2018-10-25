<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import MainItems from "./views/MainItems.vue";
    import SingleClassJob from "./views/SingleClassJob.vue";

    @Component({
        components: {SingleClassJob, MainItems}
    })
    export default class App extends Vue {
    }
</script>

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

    .table {
        display: table;
    }

    .row {
        display: table-row;
    }

    .cell {
        display: table-cell;
        border: 1px lavender dotted;
        padding: 10px;
        min-width: 10px;

        text-align: center;
    }

    .cell-column-title {
        font-weight: bold;
    }

    .title {
        display: table-caption;
    }

</style>
