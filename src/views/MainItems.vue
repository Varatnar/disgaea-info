<template>
    <div class="mainItem">
        <ItemSection sectionName="FISTS" :itemGroup="itemList.fists"/>
        <ItemSection sectionName="SWORDS" :itemGroup="itemList.swords"/>
        <ItemSection sectionName="SPEARS" :itemGroup="itemList.spears"/>
        <ItemSection sectionName="BOWS" :itemGroup="itemList.bows"/>
        <ItemSection sectionName="GUNS" :itemGroup="itemList.guns"/>
        <ItemSection sectionName="AXES" :itemGroup="itemList.axes"/>
        <ItemSection sectionName="MONSTER ATK" :itemGroup="itemList.monsterAtkWeapons"/>
        <ItemSection sectionName="MONSTER INT" :itemGroup="itemList.monsterIntWeapons"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import itemsJson from "../assets/items.json";
    import ItemSection from "../components/ItemSection.vue";
    import { ItemBundle } from "../models/Item";

    @Component({
        components: {ItemSection}
    })
    export default class MainItems extends Vue {
        public itemList: ItemBundle = itemsJson;
    }
</script>