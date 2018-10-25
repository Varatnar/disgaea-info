export interface ClassJob {
    categoryName: string;
    tiers: Tier[];
    evilities: Evility[];
    skills: Skill[];
}

export interface Tier {
    name: string;
    stats: Stats;
    weaponMasteries: WeaponMasteries;

    elementalResistances: ElementalResistances;
    weaponResistances: WeaponResistances;
    reincarnationCost: ReincarnationCost;

    unlockedHint: string;
}

// todo: replace string by enum
export interface WeaponMasteries {
    sword: string;
    spear: string;
    axe: string;
    fist: string;
    staff: string;
    gun: string;
    bow: string;
    monA: string;
    monM: string;
    armor: string;
}

export interface ElementalResistances {
    fire: number;
    ice: number;
    wind: number;
    star: number;
}

export interface WeaponResistances {
    fist: number;
    sword: number;
    spear: number;
    bow: number;
    gun: number;
    axe: number;
    staff: number;
    monster: number;
}

export interface Stats {
    mv: number;
    jump: number;
    range: number;
    throw: number;
    counter: number;
    critical: number;
    hp: Stat;
    sp: Stat;
    atk: Stat;
    def: Stat;
    int: Stat;
    res: Stat;
    hit: Stat;
    spd: Stat;
}

export interface Stat {
    baseValue: number;
    aptitude: number;
}

export interface ReincarnationCost {
    goodForNothing: number;
    incompetent: number;
    average: number;
    skilled: number;
    distinct: number;
    genius: number;
}

export interface Evility {
    name: string;
    effect: string;
    requirement: string;
    slot: string;
}

export interface Skill {
    name: string;
    lvl: string;
    sp: string;
    power: string;
    stat: string;
    element: string;
    ailment: string;
    range: string;
    height: string;
    description: string;
}
