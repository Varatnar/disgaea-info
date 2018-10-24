<template>
    <div class="testing">
        {{classGroup.categoryName}}
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { ClassJob } from "../models/Class";

    @Component({
        props: {
            sectionName: String,
            classGroup: {
                type: Object as () =>  ClassJob
            }
        }
    })
    export default class ClassSection extends Vue {

    }
</script>

<style>
    .testing {
        background-color: white;
    }
</style>
