<template>
    <div class="evilities-section">
        <div class="table">
            <div class="row">
                <div class="cell cell-column-title">
                    Name
                </div>
                <div class="cell cell-column-title">
                    Effect
                </div>
                <div class="cell cell-column-title">
                    Requirement
                </div>
                <div class="cell cell-column-title">
                    Slots
                </div>
            </div>
            <EvilityComponent v-for="evility in evilities" :evility="evility" :key="evility.name"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Evility } from "../../../models/Class";
    import EvilityComponent from "./EvilityComponent.vue";

    @Component({
        components: {
            EvilityComponent
        },
        props: {
            evilities: {
                type: Array as () => Evility[],
                required: true
            }
        }
    })
    export default class EvilitiesComponent extends Vue {

    }
</script>

<style scoped>
    .evilities-section {
        border: 1px solid orange;
    }
</style>
