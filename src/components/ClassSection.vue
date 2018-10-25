<template>
    <div>
        <span>{{classGroup.categoryName}}</span>
        <TierComponent :tier="classGroup.tiers[0]"/>
        <EvilitiesComponent :evilities="classGroup.evilities"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { ClassJob } from "../models/Class";
    import EvilitiesComponent from "./class/evility/EvilitiesComponent.vue";
    import TierComponent from "./class/TierComponent.vue";

    @Component({
        components: {
            EvilitiesComponent,
            TierComponent
        },
        props: {
            sectionName: String,
            classGroup: {
                type: Object as () => ClassJob,
                required: true
            }
        }
    })
    export default class ClassSection extends Vue {

    }
</script>

<style scoped>

</style>
