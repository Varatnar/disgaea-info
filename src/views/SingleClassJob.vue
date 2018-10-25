<!--This is a debug class-->
<template>
    <div>
        <div class="dropdown">
            <button class="dropbtn">Dropdown</button>
            <div class="dropdown-content">
                <a v-for="job in classList" @click="changeClass(job.categoryName)">{{job.categoryName}}</a>
            </div>
        </div>
        <div class="classGroup">
            <Stats :stats="currentClass.tiers[0].stats"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import classJson from "../assets/classes.json";
    import Stats from "../components/class/StatsComponent.vue";
    import { ClassJob } from "../models/Class";

    @Component({
        components: {
            Stats
        }
    })
    export default class MainItems extends Vue {
        public classList: ClassJob[] = classJson;

        public currentClass: ClassJob = this.classList[0];

        public changeClass(newClass: string) {
            this.currentClass = this.classList.find((element: ClassJob) => {
                return element.categoryName === newClass;
            }) as ClassJob;
        }
    }
</script>

<style>

    .classGroup {
        width: 1200px;
        height: 800px;
        background-color: grey;
        border: 1px solid crimson;
        float: right;
    }

    /*.table {*/
        /*background-color: whitesmoke;*/
        /*border: 1px blue dashed;*/
        /*text-align: center;*/
        /*width: 100%;*/
    /*}*/

    /* Imported stuff !!
    --------------------------------------

    /* Dropdown Button */
    .dropbtn {
        background-color: #2c3e50;
        color: white;
        padding: 16px;
        font-size: 16px;
        border: none;
    }

    /* The container <div> - needed to position the dropdown content */
    .dropdown {
        position: relative;
        display: inline-block;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
        height: 70vh;
        overflow-y: scroll;
        display: none;
        position: absolute;
        background-color: #393939;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
    }

    /* Links inside the dropdown */
    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content a:hover {
        background-color: #666;
    }

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {
        display: block;
    }

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .dropbtn {
        background-color: #43566a;
    }
</style>