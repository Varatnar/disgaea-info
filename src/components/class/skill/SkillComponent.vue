<template>
    <div class="row">
        <div class="cell">
            {{skill.name}}
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Skill } from "../../../models/Class";

    @Component({
        props: {
            skill: {
                type: Object as () => Skill,
                required: true
            }
        }
    })
    export default class SkillComponent extends Vue {

    }
</script>

<style scoped>

</style>
