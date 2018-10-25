<template>
    <div class="basic-stats-component">
        <div class="table">
            <div class="row">
                <div class="cell">Mv</div>
                <div class="cell">{{stats.mv}}</div>
            </div>

            <div class="row">
                <div class="cell">Jmp</div>
                <div class="cell">{{stats.jump}}</div>
            </div>

            <div class="row">
                <div class="cell">Range</div>
                <div class="cell">{{stats.range}}</div>
            </div>

            <div class="row">
                <div class="cell">Throw</div>
                <div class="cell">{{stats.throw}}</div>
            </div>

            <div class="row">
                <div class="cell">Counter</div>
                <div class="cell">{{stats.counter}}</div>
            </div>

            <div class="row">
                <div class="cell">Critical</div>
                <div class="cell">{{stats.critical}}%</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Stats } from "../../../models/Class";

    @Component({
        props: {
            stats: {
                type: Object as () => Stats,
                required: true
            }
        }
    })
    export default class BasicStatComponent extends Vue {

    }
</script>

<style scoped>

    .basic-stats-component {
    }

</style>
