<template>
    <div class="table">
        <EvilityComponent v-for="evility in evilities" :evility="evility" :key="evility.name"/>
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

<style>

</style>
