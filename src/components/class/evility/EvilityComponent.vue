<template>
    <div class="row">
        <div class="cell">
            {{evility.name}}
        </div>
        <div class="cell">
            {{evility.effect}}
        </div>
        <div class="cell">
            {{evility.requirement}}
        </div>
        <div class="cell">
            {{evility.slot}}
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Evility } from "../../../models/Class";

    @Component({
        props: {
            evility: {
                type: Object as () => Evility,
                required: true
            }
        }
    })
    export default class EvilityComponent extends Vue {

    }
</script>

<style scoped>

</style>
