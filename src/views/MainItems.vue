<template>
    <div class="mainItem">
        <div v-for="item in itemList.fists" class="itemRow">
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
    import itemsJson from "../assets/items.json";
    import { ItemBundle } from "../models/Item";

    @Component
    export default class MainItems extends Vue {
        public itemList: ItemBundle = itemsJson;

        public fists = this.itemList.fists;

        public constructor() {
            super();
        }
    }
</script>

<style>
    .itemRow {
        border: 1px solid #CCC;
        float: left;
        clear: left;
    }

    .itemName {
        padding: 5px 5px 5px 15px;
        width: 200px;
        border-right: 1px solid #CCC;
        color: #CCC;
        float: left;
        background: #333;
    }

    .itemRank {
        padding: 5px 5px 5px 15px;
        width: 50px;
        color: #CCC;
        float: left;
        text-align: center;
        background: #111;
    }
</style>