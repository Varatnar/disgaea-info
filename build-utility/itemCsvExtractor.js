const csv = require('csv-parse');
const fs = require('fs');
const {Item, Indexes} = require('./Item');

const EXPECTED_COLUMN = 19;

const bundleLocation = `${__dirname}/../src/assets/items.json`;

const basePath = `${__dirname}/data`;
const GamePaths = {
    DISGAEA_5: "disgaea-5"
};
const itemDirectory = "items";

const shortCutVariable = `${basePath}/${GamePaths.DISGAEA_5}/${itemDirectory}`;

const ItemFiles = {
    fists: `${shortCutVariable}/Disgaea 5 Lists - Fist.csv`,
    swords: `${shortCutVariable}/Disgaea 5 Lists - Sword.csv`,
    spears: `${shortCutVariable}/Disgaea 5 Lists - Spear.csv`,
    bows: `${shortCutVariable}/Disgaea 5 Lists - Bow.csv`,
    guns: `${shortCutVariable}/Disgaea 5 Lists - Gun.csv`,
    axes: `${shortCutVariable}/Disgaea 5 Lists - Axe.csv`,
    staves: `${shortCutVariable}/Disgaea 5 Lists - Staff.csv`,
    monsterAtkWeapons: `${shortCutVariable}/Disgaea 5 Lists - MATK.csv`,
    monsterIntWeapons: `${shortCutVariable}/Disgaea 5 Lists - MEmb.csv`,
    armors: `${shortCutVariable}/Disgaea 5 Lists - Armor.csv`,
    belts: `${shortCutVariable}/Disgaea 5 Lists - Belt.csv`,
    muscles: `${shortCutVariable}/Disgaea 5 Lists - Muscle.csv`,
    shoes: `${shortCutVariable}/Disgaea 5 Lists - Shoe.csv`,
    glasses: `${shortCutVariable}/Disgaea 5 Lists - Glass.csv`,
    orbs: `${shortCutVariable}/Disgaea 5 Lists - Orb.csv`,
    emblems: `${shortCutVariable}/Disgaea 5 Lists - Emblem.csv`,
};

const items = {
    fists: [],
    swords: [],
    spears: [],
    bows: [],
    guns: [],
    axes: [],
    staves: [],
    monsterAtkWeapons: [],
    monsterIntWeapons: [],
    armors: [],
    belts: [],
    muscles: [],
    shoes: [],
    glasses: [],
    orbs: [],
    emblems: [],
    [Symbol.iterator]: function* () {
        for (let key in items) {
            yield items[key];
        }
    }
};

function isParsedDataValid(parsedData) {
    // Arbitrary check on atk index, not the best, but working for now and I dont feel like adding a
    // complicated logic for it ...
    // todo: Implement better logic to make sure the data is insert-able as an Item
    return parsedData.length === EXPECTED_COLUMN && !isNaN(parsedData[Indexes.ATK]);
}

async function parseFile(file) {
    const container = [];
    let lineError;

    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(csv())
            .on('data', (line) => {
                lineError = line;
                if (isParsedDataValid(line)) {
                    try {
                        container.push(new Item(line));
                    } catch (error) {
                        throw new Error(`Error when parsin file [${file}]\n${error}`)
                    }
                }
            })
            .on('error', () => reject(Error(`Could not parse file [${file}]\n Error at line : ${lineError}`)))
            .on('end', () => {
                resolve(container);
            });
    });
}

async function parseAllItems() {
    for (let fileKey in ItemFiles) {
        items[fileKey] = await parseFile(ItemFiles[fileKey]);
    }
}

parseAllItems().then(async () => {
    try {
        await fs.writeFileSync(bundleLocation, JSON.stringify(items, null, 2), "utf-8");
        console.log(`Successfully created JSON bundle for items at [${bundleLocation}]`)
    } catch (error) {
        console.error(error);
    }
});
