<template>
    <div class="skills-section">
        <div class="table">
            <div class="row">
                <div class="cell cell-column-title">
                    Name
                </div>
                <div class="cell cell-column-title">
                    Level
                </div>
                <div class="cell cell-column-title">
                    SP
                </div>
                <div class="cell cell-column-title">
                    Power
                </div>
                <div class="cell cell-column-title">
                    Stat
                </div>
                <div class="cell cell-column-title">
                    Element
                </div>
                <div class="cell cell-column-title">
                    Ailment
                </div>
                <div class="cell cell-column-title">
                    Range
                </div>
                <div class="cell cell-column-title">
                    Description
                </div>
            </div>
            <SkillComponent v-for="skill in skills" :skill="skill" :key="skill.name"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Skill } from "../../../models/Class";
    import SkillComponent from "./SkillComponent.vue";

    @Component({
        components: {
            SkillComponent
        },
        props: {
            skills: {
                type: Array as () => Skill[]
            }
        }
    })
    export default class SkillsComponent extends Vue {

    }
</script>

<style scoped>

    .skills-section {
        border: 1px solid cyan;
    }

</style>
