/**
 * Main class group for a given class
 */
class ClassJob {
    constructor(name) {
        this.categoryName = name;

        this.tiers = [];
        this.evilities = [];
        this.skills = [];
    }

    addTier(tier) {
        this.tiers.push(tier)
    }

    addEvility(evility) {
        this.evilities.push(evility);
    }

    addSkill(skill) {
        this.skills.push(skill);
    }
}

/**
 * Definition of a tier in disgaea 5
 */
class Tier {
    constructor(name) {
        this.name = name;

        this.stats = {
            mv: 0,
            jump: 0,
            range: 0,
            throw: 0,
            counter: 0,
            critical: 0,
            hp: {},
            sp: {},
            atk: {},
            def: {},
            int: {},
            res: {},
            hit: {},
            spd: {}
        };

        this.weaponMasteries = {
            sword: "N/A",
            spear: "N/A",
            axe: "N/A",
            fist: "N/A",
            staff: "N/A",
            gun: "N/A",
            bow: "N/A",
            monA: "N/A",
            monM: "N/A",
            armor: "N/A"
        };

        this.elementalResistances = {};
        this.weaponResistances = {};
        this.reincarnationCost = {};

        this.unlockedHint = "";
    }

    /**
     * Set the basic stats for this tier
     *
     * @param mv{string}
     * @param jump{string}
     * @param range{string}
     * @param throwRange{string}
     * @param counter{string}
     * @param critical{string}
     */
    setStaticStat(mv, jump, range, throwRange, counter, critical) {
        this.stats.mv = parseInt(mv);
        this.stats.jump = parseInt(jump);
        this.stats.range = parseInt(range);
        this.stats.throw = parseInt(throwRange);
        this.stats.counter = parseInt(counter);
        this.stats.critical = parseInt(critical);
    }

    /**
     * Set the stats of this tier
     *
     * @param hp{Stat}
     * @param sp{Stat}
     * @param atk{Stat}
     * @param def{Stat}
     * @param int{Stat}
     * @param res{Stat}
     * @param hit{Stat}
     * @param spd{Stat}
     */
    setDynamicStat(hp, sp, atk, def, int, res, hit, spd) {
        this.stats.hp = hp;
        this.stats.sp = sp;
        this.stats.atk = atk;
        this.stats.def = def;
        this.stats.int = int;
        this.stats.res = res;
        this.stats.hit = hit;
        this.stats.spd = spd;
    }

    /**
     * Sets the mastery level of all weapon type.
     *
     * @param sword{string}
     * @param spear{string}
     * @param axe{string}
     * @param fist{string}
     * @param staff{string}
     * @param gun{string}
     * @param bow{string}
     * @param monA{string}
     * @param monM{string}
     * @param armor{string}
     */
    setWeaponMasteries(sword, spear, axe, fist, staff, gun, bow, monA, monM, armor) {
        this.weaponMasteries = {
            sword: sword,
            spear: spear,
            axe: axe,
            fist: fist,
            staff: staff,
            gun: gun,
            bow: bow,
            monA: monA,
            monM: monM,
            armor: armor
        };
    }

    /**
     * Set the elemental resistances for this tier
     *
     * @param fire{string}
     * @param ice{string}
     * @param wind{string}
     * @param star{string}
     */
    setElementalResistances(fire, ice, wind, star) {
        this.elementalResistances = {
            fire: parseInt(fire),
            ice: parseInt(ice),
            wind: parseInt(wind),
            star: parseInt(star)
        }
    }

    /**
     * Set the weapon resistances for this tier
     *
     * @param fist{string}
     * @param sword{string}
     * @param spear{string}
     * @param bow{string}
     * @param gun{string}
     * @param axe{string}
     * @param staff{string}
     * @param monster{string}
     */
    setWeaponResistances(fist, sword, spear, bow, gun, axe, staff, monster) {
        this.weaponResistances = {
            fist: parseInt(fist),
            sword: parseInt(sword),
            spear: parseInt(spear),
            bow: parseInt(bow),
            gun: parseInt(gun),
            axe: parseInt(axe),
            staff: parseInt(staff),
            monster: parseInt(monster)
        }
    }

    /**
     * Set the mana cost for the different reincarnation for this tier
     *
     * @param goodForNothing{string}
     * @param incompetent{string}
     * @param average{string}
     * @param skilled{string}
     * @param distinct{string}
     * @param genius{string}
     */
    setReincarnationCost(goodForNothing, incompetent, average, skilled, distinct, genius) {
        this.reincarnationCost = {
            goodForNothing: parseInt(goodForNothing),
            incompetent: parseInt(incompetent),
            average: parseInt(average),
            skilled: parseInt(skilled),
            distinct: parseInt(distinct),
            genius: parseInt(genius)
        }
    }

    /**
     * Set the hint message to unlock this tier
     *
     * @param hintMessage{string}
     */
    setUnlockHint(hintMessage) {
        this.unlockedHint = hintMessage;
    }
}

/**
 * Wrapper object for the base value and the aptitude of stats
 */
class Stat {
    constructor(baseValuet, aptitude) {
        this.baseValue = parseInt(baseValuet);
        this.aptitude = parseInt(aptitude);
    }
}

/**
 * Evility definition in disgaea 5
 */
class Evility {
    constructor(name, effect, requirement, slot) {
        this.name = name;
        this.effect = effect;
        this.requirement = requirement;
        this.slot = slot;
    }
}

/**
 * Skill definition in disgaea 5
 */
class Skill {
    constructor(name, lvl, sp, power, stat, element, ailment, range, height, description, rangeData) {
        this.name = name;
        this.lvl = lvl;
        this.sp = sp;
        this.power = power;
        this.stat = stat;
        this.element = element;
        this.ailment = ailment;
        this.range = range;
        this.height = height;
        this.description = description;
        this.rangeData = rangeData;//todo: make image analyser and save point information rather than image
    }
}

module.exports = {
    ClassJob,
    Tier,
    Stat,
    Evility,
    Skill
};
