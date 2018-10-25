<template>
    <div>
        {{tier.name}}
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
                type: Object as () => Tier
            }
        }
    })
    export default class TierComponent extends Vue {

    }
</script>

<style scoped>

</style>