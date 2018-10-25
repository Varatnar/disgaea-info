<template>
    <div class="table">
        <SkillComponent v-for="skill in skills" :skill="skill" :key="skill.name"/>
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

</style>
