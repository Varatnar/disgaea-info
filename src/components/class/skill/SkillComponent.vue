<template>
    <div class="row">
        <div class="cell">
            {{skill.name}}
        </div>
        <div class="cell">
            {{skill.lvl}}
        </div>
        <div class="cell">
            {{skill.sp}}
        </div>
        <div class="cell">
            {{skill.power}}
        </div>
        <div class="cell">
            {{skill.stat}}
        </div>
        <div class="cell">
            {{skill.element}}
        </div>
        <div class="cell">
            {{skill.ailment}}
        </div>
        <div class="cell">
            {{skill.range}}
        </div>
        <div class="cell">
            {{skill.description}}
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
