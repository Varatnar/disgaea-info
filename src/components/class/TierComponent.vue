<template>
    <div class="tier-data">
        <span>{{tier.name}}</span>
        <div class="cell">
            <StatsComponent :stats="tier.stats"/>
        </div>
        <div class="cell">
            <BasicStatComponent :stats="tier.stats"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Tier } from "../../models/Class";
    import BasicStatComponent from "./stat/BasicStatsComponent.vue";
    import StatsComponent from "./stat/StatsComponent.vue";

    @Component({
        components: {
            BasicStatComponent,
            StatsComponent
        },
        props: {
            tier: {
                type: Object as () => Tier,
                required: true
            }
        }
    })
    export default class TierComponent extends Vue {

    }
</script>

<style scoped>

    .tier-data {
        border: 1px solid blue;
    }

</style>