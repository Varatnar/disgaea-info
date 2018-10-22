<template>
    <div class="itemGroup">
        <div class="itemType">
            {{sectionName}}
        </div>
        <div v-for="item in itemGroup" v-if="item.itemRank !== '-'" class="itemRow">
            <div class="itemName">
                {{item.name}}
            </div>
            <div class="itemRank">
                {{item.itemRank}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { Fist } from "../models/Item";

    @Component({
        props: {
            sectionName: String,
            itemGroup: {
                type: Array as () => Fist[]
            }
        }
    })
    export default class ItemSection extends Vue {

    }
</script>

<style>
    .itemGroup {
        margin: 5px;
        float: left;
        width: calc((100% / 8) - (5px * 2));
    }

    .itemType {
        padding: 5px 5px 5px 15px;
        border: 1px solid #CCC;
        color: #CCC;
        background: #333;
        font-weight: bold;
        width: calc(100% - (5px * 4));
    }

    .itemRow {
        border: 1px solid #CCC;
        float: left;
        width: 100%;
    }

    .itemName {
        padding: 5px 5px 5px 15px;
        color: #CCC;
        float: left;
        white-space: nowrap;
        overflow: hidden;
        width: calc(100% - 61px);
    }

    div.itemGroup > div:nth-child(even) {
        background: #202020;
    }

    div.itemGroup > div:nth-child(2n+3) {
        background: #393939;
    }

    .itemRank {
        padding: 5px 5px 5px 15px;
        border-left: 1px solid #CCC;
        width: 20px;
        height: content-box;
        color: #CCC;
        float: right;
        text-align: center;
        background: #111;
    }
</style>