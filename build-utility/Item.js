class Item {
    constructor(data) {
        try {
            this.jpName = data[Indexes.JAPANESE_NAME];
            this.name = data[Indexes.ENGLISH_NAME];

            this.itemRank = data[Indexes.ITEM_RANK];
            this.special = this.itemRank === "-";

            this.shopLevel = data[Indexes.SHOP_LEVEL];
            if (isNaN(this.shopLevel)) {
                this.shopCost = "-";
            } else {
                this.shopCost = data[Indexes.SHOP_COST];
            }

            this.hp = validateNumber(data[Indexes.HP]);
            this.sp = validateNumber(data[Indexes.SP]);
            this.atk = validateNumber(data[Indexes.ATK]);
            this.def = validateNumber(data[Indexes.DEF]);
            this.int = validateNumber(data[Indexes.INT]);
            this.res = validateNumber(data[Indexes.RES]);
            this.hit = validateNumber(data[Indexes.HIT]);
            this.spd = validateNumber(data[Indexes.SPD]);

            this.movement = validateNumber(data[Indexes.MOVEMENT]);
            this.jump = validateNumber(data[Indexes.JUMP]);
            this.range = validateNumber(data[Indexes.RANGE]);
            this.counter = validateNumber(data[Indexes.COUNTER]);
            this.critical = validateNumber(data[Indexes.CRITICAL]);

            this.innocent = data[Indexes.INNOCENT];
        } catch (rootError) {
            throw new Error(`Could not create item with data,\n Data : ${data}\n Cause : ${rootError}`);
        }
    }
}

function validateNumber(input) {
    if (input === '') {
        return 0;
    } else {
        if (isNaN(input)) {
            throw new Error(`Unexpected string ["${input}"] when parsing int value...`);
        }
        return parseInt(input);
    }
}

//todo: not constant with current csv !!
const Indexes = {
    JAPANESE_NAME: 0,
    ENGLISH_NAME: 1,
    ITEM_RANK: 2,
    SHOP_LEVEL: 3,
    SHOP_COST: 4,
    HP: 5,
    SP: 6,
    ATK: 7,
    DEF: 8,
    INT: 9,
    RES: 10,
    HIT: 11,
    SPD: 12,
    MOVEMENT: 13,
    JUMP: 14,
    RANGE: 15,
    COUNTER: 16,
    CRITICAL: 17,
    INNOCENT: 18
};

module.exports = {
    Item,
    Indexes
};
