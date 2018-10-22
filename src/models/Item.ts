export interface Item {

    japName: string;
    name: string;

    itemRank: string;

    shopLevel: number;
    shopCost: number;

    hp: number;
    sp: number;
    atk: number;
    def: number;
    int: number;
    res: number;
    hit: number;
    spd: number;
    movement: number;
    jump: number;
    range: number;
    counter: number;
    critical: number;

    innocent: string;
}

export interface Fist extends Item {}
export interface Sword extends Item {}
export interface Spear extends Item {}
export interface Bow extends Item {}
export interface Gun extends Item {}
export interface Axe extends Item {}
export interface Staff extends Item {}
export interface MonsterAtkWeapon extends Item {}

export interface MonsterIntWeapon extends Item {
}

export interface ItemBundle {
    fists: Fist[];
    swords: Sword[];
    spears: Spear[];
    bows: Bow[];
    guns: Gun[];
    axes: Axe[];
    staves: Staff[];
    monsterAtkWeapons: MonsterAtkWeapon[];
    monsterIntWeapons: MonsterIntWeapon[];
}
