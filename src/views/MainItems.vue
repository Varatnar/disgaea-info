<template>
    <div class="mainItem">
        <ItemSection sectionName="FISTS" :itemGroup="itemList.fists"/>
        <ItemSection sectionName="SWORDS" :itemGroup="itemList.swords"/>
        <ItemSection sectionName="SPEARS" :itemGroup="itemList.spears"/>
        <ItemSection sectionName="BOWS" :itemGroup="itemList.bows"/>
        <ItemSection sectionName="GUNS" :itemGroup="itemList.guns"/>
        <ItemSection sectionName="AXES" :itemGroup="itemList.axes"/>
        <ItemSection sectionName="STAVES" :itemGroup="itemList.staves"/>
        <ItemSection sectionName="MONSTER ATK" :itemGroup="itemList.monsterAtkWeapons"/>
        <ItemSection sectionName="MONSTER INT" :itemGroup="itemList.monsterIntWeapons"/>
        <ItemSection section-name="ARMORS" :itemGroup="itemList.armors"/>
        <ItemSection section-name="BELT" :item-group="itemList.belts"/>
        <ItemSection section-name="MUSCLES" :item-group="itemList.muscles"/>
        <ItemSection section-name="SHOES" :item-group="itemList.shoes"/>
        <ItemSection section-name="GLASSES" :item-group="itemList.glasses"/>
        <ItemSection section-name="ORBS" :item-group="itemList.orbs"/>
        <ItemSection section-name="EMBLEMS" :item-group="itemList.emblems"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import itemsJson from "../assets/items.json";
    import ItemSection from "../components/ItemSection.vue";
    import { ItemBundle } from "../models/Item";

    @Component({
        components: {
            ItemSection
        }
    })
    export default class MainItems extends Vue {
        public itemList: ItemBundle = itemsJson;
    }
</script>

<style>
    .mainItem {
        text-align: center;
    }
</style>
