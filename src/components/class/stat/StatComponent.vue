<template>
    <div class="row">
        <div class="cell">
            {{rowName}}
        </div>
        <div class="cell">
            {{stat.baseValue}}
        </div>
        <div class="cell">
            {{stat.aptitude}}%
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Stat } from "../../../models/Class";

    @Component({
        props: {
            rowName: String,
            stat: {
                type: Object as () => Stat,
                required: true
            }
        }
    })
    export default class StatComponent extends Vue {

    }
</script>

<style scoped>

    .cell {
        padding: 6px;
        text-align: center;
    }

</style>
