<template>
    <div class="table">
        <div class="row">
            <div class="cell">
                <!--blank-->
            </div>
            <div class="cell cell-column-title">Base stat</div>
            <div class="cell cell-column-title">Aptitude</div>
        </div>
        <StatComponent row-name="HP" :stat="stats.hp"/>
        <StatComponent row-name="SP" :stat="stats.sp"/>
        <StatComponent row-name="Atk" :stat="stats.atk"/>
        <StatComponent row-name="Def" :stat="stats.def"/>
        <StatComponent row-name="Int" :stat="stats.int"/>
        <StatComponent row-name="Hit" :stat="stats.hit"/>
        <StatComponent row-name="Spd" :stat="stats.spd"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Stats } from "../../models/Class";
    import StatComponent from "./StatComponent.vue";

    @Component({
        components: {StatComponent},
        props: {
            stats: {
                type: Object as () => Stats
            }
        }
    })
    export default class StatsComponent extends Vue {

    }
</script>

<style scoped>
    .cell {
        padding: 10px;
    }
</style>
