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
        margin: 3px 3px 20px;
        float: left;
        width: calc(((100% - (54px)) / 9));
    }

    .itemType {
        padding-top: 5px;
        border: 1px solid #CCC;
        color: #CCC;
        background: #333;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        height: 30px;
    }

    .itemRow {
        border-bottom: 1px solid #CCC;
        border-left: 1px solid #CCC;
        border-right: 1px solid #CCC;
        float: left;
        width: 100%;
        height: calc(((100vh - 45px)/ 42));
    }

    .itemName {
        color: #CCC;
        float: left;
        vertical-align: middle;
        white-space: nowrap;
        overflow: hidden;
        width: 80%;
        height: 100%;
    }

    div.itemGroup > div:nth-child(even) {
        background: #202020;
    }

    div.itemGroup > div:nth-child(2n+3) {
        background: #393939;
    }

    .itemRank {
        border-left: 1px solid #CCC;
        width: 20%;
        overflow: hidden;
        color: #CCC;
        float: right;
        text-align: center;
        background: #111;
        height: 100%;
    }
</style>