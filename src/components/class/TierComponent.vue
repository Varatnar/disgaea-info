<template>
    <div class="tier-data">
        <span>{{tier.name}}</span>
        <StatsComponent :stats="tier.stats"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Tier } from "../../models/Class";
    import StatsComponent from "./stat/StatsComponent.vue";

    @Component({
        components: {
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