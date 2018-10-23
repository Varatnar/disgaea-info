const {ClassJob, Tier, Stat} = require('./ClassReferences');
const request = require('request');
const {JSDOM} = require('jsdom');

const DEFAULT_URL = "http://disgaea.wikia.com/wiki";
const DEFAULT_GAME = "Disgaea_5";

/**
 * Wrapper function for request to make it use a Promise
 *
 * @param url{string} URL to poll
 * @returns {Promise<Body>}
 */
async function get(url) {
    return new Promise(((resolve, reject) => {
        request({uri: url}, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject();
            }
        });
    }));
}

async function retrieveClassInformation(className, domainUrlOverride, gameOverride) {

    const domainUrl = domainUrlOverride || DEFAULT_URL;
    const gameVersion = gameOverride || DEFAULT_GAME;

    const fullUrl = `${domainUrl}/${className}_(${gameVersion})`;

    const document = new JSDOM(await get(fullUrl)).window.document;

    const subClassesName = retrieveSubClassName(document);

    if (subClassesName[0] !== className) {
        throw new Error(`Reference class name [${className}] did not match [${subClassesName[0]}]`)
    }

    //example with first one
    const currentClass = new ClassJob(className);

    subClassesName.forEach((subClassName) => {
        currentClass.addTier(retrieveTierDataForClass(document, subClassName));
    });

    console.log(JSON.stringify(currentClass, null, 2));

}

function retrieveSubClassName(htmlDocument) {
    const subClassSelector = "div > .tabbertab";

    const subClasses = [];

    htmlDocument.documentElement.querySelectorAll(subClassSelector).forEach((element) => {
        subClasses.push(element.title)
    });

    return subClasses;
}

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

    // Unlocked hint

    // Evilities
    const evilitiesSelector = ``;

    // Skills
    const skillSelector = ``;

    return tier;
}

function cleanInput(input) {
    return input.replace(/ /g, '').replace(/%/g, '').replace(/\n/g, '');
}

retrieveClassInformation("Professor").then(() => {
});