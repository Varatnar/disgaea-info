const {ClassJob, Tier, Stat, Evility, Skill} = require('./ClassReferences');
const request = require('request');
const {JSDOM} = require('jsdom');
const fs = require('fs');

const DEFAULT_DOMAIN_URL = "http://disgaea.fandom.com/wiki";
const DEFAULT_GAME = "Disgaea_5";

const bundleLocation = `${__dirname}/../src/assets/classes.json`;

/**
 * Wrapper function for request to make it use a Promise
 *
 * @param url{string} URL to poll
 * @param game{string|null}
 * @param noRetry{boolean}
 * @returns {Promise<Body>}
 */
async function get(url, game, noRetry) {
    return new Promise(((resolve, reject) => {
        request({uri: url}, async (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else if (!noRetry) {
                const newUrl = url.replace(`_(${game})`, '');
                resolve(await get(newUrl, null, true));
            } else {
                reject(Error("Could not access page !"));
            }
        });
    }));
}

async function retrieveClassInformation(className, isNoSkillLevelSp, domainUrlOverride, gameOverride) {

    const domainUrl = domainUrlOverride || DEFAULT_DOMAIN_URL;
    const gameVersion = gameOverride || DEFAULT_GAME;

    const fullUrl = `${domainUrl}/${className}_(${gameVersion})`;

    const document = new JSDOM(await get(fullUrl, gameVersion, false)).window.document;

    const subClassesName = retrieveSubClassName(document);

    const currentClass = new ClassJob(className);

    subClassesName.forEach((subClassName) => {
        currentClass.addTier(retrieveTierDataForClass(document, subClassName));
    });


    // Evilities
    const evilitySelector = `#mw-content-text > table:nth-of-type(2) > tbody > tr:nth-child(n+2)`;

    document.documentElement.querySelectorAll(evilitySelector).forEach((element) => {
        currentClass.addEvility(new Evility(
            cleanSpaceNewLine(element.childNodes[1].textContent),
            cleanSpaceNewLine(element.childNodes[2].textContent),
            cleanSpaceNewLine(element.childNodes[3].textContent),
            cleanSpaceNewLine(element.childNodes[4].textContent)
            )
        );
    });

    // Skills
    const skillSelector = `#mw-content-text > table:nth-of-type(3) > tbody > tr:nth-child(n+2)`;

    if (isNoSkillLevelSp) {
        document.documentElement.querySelectorAll(skillSelector).forEach((element) => {
            currentClass.addSkill(new Skill(
                cleanSpaceNewLine(element.childNodes[1].textContent),
                cleanSpaceNewLine(element.childNodes[8].textContent),
                "?",
                cleanSpaceNewLine(element.childNodes[2].textContent),
                cleanSpaceNewLine(element.childNodes[3].textContent),
                cleanSpaceNewLine(element.childNodes[4].textContent),
                cleanSpaceNewLine(element.childNodes[5].textContent),
                cleanSpaceNewLine(element.childNodes[6].textContent),
                cleanSpaceNewLine(element.childNodes[7].textContent),
                cleanSpaceNewLine(element.childNodes[9].textContent),
                )
            );
        });
    } else {
        document.documentElement.querySelectorAll(skillSelector).forEach((element) => {
            let i = 1;
            currentClass.addSkill(new Skill(
                cleanSpaceNewLine(element.childNodes[i++].textContent),
                cleanSpaceNewLine(element.childNodes[i++].textContent),
                cleanSpaceNewLine(element.childNodes[i++].textContent),
                cleanSpaceNewLine(element.childNodes[i++].textContent),
                cleanSpaceNewLine(element.childNodes[i++].textContent),
                cleanSpaceNewLine(element.childNodes[i++].textContent),
                cleanSpaceNewLine(element.childNodes[i++].textContent),
                cleanSpaceNewLine(element.childNodes[i++].textContent),
                cleanSpaceNewLine(element.childNodes[i++].textContent),
                cleanSpaceNewLine(element.childNodes[i].textContent),
                )
            );
        });
    }

    return currentClass;

}

function retrieveSubClassName(htmlDocument) {
    const subClassSelector = "div > .tabbertab";

    const subClasses = [];

    htmlDocument.documentElement.querySelectorAll(subClassSelector).forEach((element) => {
        subClasses.push(element.title)
    });

    return subClasses;
}

/**
 * Monster function that retrieves data for a class tier
 *
 * @param document{Document}
 * @param tierName{string}
 * @returns {Tier}
 */
function retrieveTierDataForClass(document, tierName) {
    const tier = new Tier(tierName);

    // Static stat section
    const staticStatSelector = `div > .tabbertab[title="${tierName}"] > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(4) > td`;
    const staticStats = [];
    let i = 0;
    document.documentElement.querySelectorAll(staticStatSelector).forEach((element) => {
        staticStats.push(cleanInput(element.textContent));
    });

    tier.setStaticStat(
        staticStats[i++],
        staticStats[i++],
        staticStats[i++],
        staticStats[i++],
        staticStats[i++],
        staticStats[i],
    );

    // Dynamic stat section
    const dynamicStatSelector = `div > .tabbertab[title="${tierName}"] > table > tbody >  tr:nth-child(4) > td > table > tbody >tr:nth-child(2)> td > table > tbody > tr:nth-child(2) > td`;
    const dynamicStats = [];
    i = 0;
    document.documentElement.querySelectorAll(dynamicStatSelector).forEach((element) => {
        const statAptitude = element.innerHTML.split("<br>");
        statAptitude.forEach(value => {
            dynamicStats.push(cleanInput(value))
        });
    });

    tier.setDynamicStat(
        new Stat(dynamicStats[i++], dynamicStats[i++]),
        new Stat(dynamicStats[i++], dynamicStats[i++]),
        new Stat(dynamicStats[i++], dynamicStats[i++]),
        new Stat(dynamicStats[i++], dynamicStats[i++]),
        new Stat(dynamicStats[i++], dynamicStats[i++]),
        new Stat(dynamicStats[i++], dynamicStats[i++]),
        new Stat(dynamicStats[i++], dynamicStats[i++]),
        new Stat(dynamicStats[i++], dynamicStats[i])
    );

    // Weapon Mastery
    const weaponMasterySelecor = `div > .tabbertab[title="${tierName}"] > table > tbody > tr:nth-child(5) > td > table > tbody >tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td`;
    const weaponMasteries = [];
    i = 0;

    document.documentElement.querySelectorAll(weaponMasterySelecor).forEach((element) => {
        weaponMasteries.push(cleanInput(element.textContent));
    });

    tier.setWeaponMasteries(
        weaponMasteries[i++],
        weaponMasteries[i++],
        weaponMasteries[i++],
        weaponMasteries[i++],
        weaponMasteries[i++],
        weaponMasteries[i++],
        weaponMasteries[i++],
        weaponMasteries[i++],
        weaponMasteries[i++],
        weaponMasteries[i]
    );

    // Elemental Resistance
    const elementalResistanceSelector = `div > .tabbertab[title="${tierName}"] > table > tbody > tr:nth-child(6) > td > table > tbody >tr:nth-child(1) > th`;
    const elementalResistances = [];
    i = 0;

    document.documentElement.querySelectorAll(elementalResistanceSelector).forEach((element) => {
        const elementValue = element.textContent.split(":");
        elementalResistances.push(cleanInput(elementValue[1]));
    });

    tier.setElementalResistances(
        elementalResistances[i++],
        elementalResistances[i++],
        elementalResistances[i++],
        elementalResistances[i]
    );

    // Weapon Resistances
    const weaponResistanceSelector = `div > .tabbertab[title="${tierName}"] > table > tbody > tr:nth-child(7) > td > table > tbody >tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td`;
    const weaponResistances = [];
    i = 0;

    document.documentElement.querySelectorAll(weaponResistanceSelector).forEach((element) => {
        weaponResistances.push(cleanInput(element.textContent));
    });

    tier.setWeaponResistances(
        weaponResistances[i++],
        weaponResistances[i++],
        weaponResistances[i++],
        weaponResistances[i++],
        weaponResistances[i++],
        weaponResistances[i++],
        weaponResistances[i++],
        weaponResistances[i]
    );

    // Reincarnation Cost
    const reincarnationCostSelector = `div > .tabbertab[title="${tierName}"] > table > tbody > tr:nth-child(9) > td > table > tbody >tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td`;
    const reincarnationCosts = [];
    i = 0;

    document.documentElement.querySelectorAll(reincarnationCostSelector).forEach((element) => {
        reincarnationCosts.push(cleanInput(element.textContent));
    });

    tier.setReincarnationCost(
        reincarnationCosts[i++],
        reincarnationCosts[i++],
        reincarnationCosts[i++],
        reincarnationCosts[i++],
        reincarnationCosts[i++],
        reincarnationCosts[i]
    );

    // Unlock hint
    const unlockHintSelector = `div > .tabbertab[title="${tierName}"] > table > tbody > tr:nth-child(8) > td > table > tbody > tr > td`;

    tier.setUnlockHint(cleanSpaceNewLine(document.documentElement.querySelector(unlockHintSelector).textContent));

    return tier;
}

function cleanInput(input) {
    return input.replace(/ /g, '').replace(/%/g, '').replace(/\n/g, '');
}

function cleanSpaceNewLine(input) {
    return input.replace(/^ | $|\n/gm, '');
}

const humanClassNames = [
    "Professor"
];

const monsterClasseNames = [
    "Dragon_King"
];
const classes = [];

async function ripAllClasses() {

    for (let humanClassNamesKey in humanClassNames) {
        classes.push(await retrieveClassInformation(humanClassNames[humanClassNamesKey]));
    }

    for (let monsterClassNamesKey in monsterClasseNames) {
        classes.push(await retrieveClassInformation(monsterClasseNames[monsterClassNamesKey], true));
    }

    // humanClassNames.forEach(async value => {
    //     try {
    //         classes.push(await retrieveClassInformation(value))
    //     } catch (e) {
    //         console.error(`${e}`);
    //     }
    // });

    // monsterClasseNames.forEach(async value => {
    //     try {
    //         // Weird argument needed because skill use different format for monster...
    //         classes.push(await retrieveClassInformation(value, true));
    //     } catch (e) {
    //         console.error(`${e}`);
    //     }
    // });

}

ripAllClasses().then(async () => {
    try {
        await fs.writeFileSync(bundleLocation, JSON.stringify(classes, null, 2), "utf-8");
        console.log(`Successfully created JSON bundle for classes at [${bundleLocation}]`)
    } catch (error) {
        console.error(error);
    }
});
