<template>
    <div id="app">
        <div class="switcher" @click="resolvePageMove()">
            <font-awesome-icon icon="location-arrow"/>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { library } from "@fortawesome/fontawesome-svg-core";
    import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    import Vue from "vue";
    import { Component } from "vue-property-decorator";
    import MainItems from "./views/MainItems.vue";
    import SingleClassJob from "./views/SingleClassJob.vue";

    library.add(faLocationArrow);

    @Component({
        components: {
            SingleClassJob,
            MainItems,
            FontAwesomeIcon
        }
    })
    export default class App extends Vue {

        public resolvePageMove() {
            if (this.$router.currentRoute.fullPath === "/items") {
                this.$router.push("/classes");
            } else {
                this.$router.push("/items");
            }
        }
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

    .switcher {
        position: fixed;
        right: 5px;

        padding: 10px;

        border-radius: 5px;
        border: 1px solid black;
        background-color: whitesmoke;
        opacity: 0.2;
    }

    .switcher:hover {
        opacity: 0.8;
        cursor: pointer;
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
