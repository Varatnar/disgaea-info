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
    FIST: `${shortCutVariable}/Disgaea 5 Lists - Fist.csv`,
    SWORD: `${shortCutVariable}/Disgaea 5 Lists - Sword.csv`,
    SPEAR: `${shortCutVariable}/Disgaea 5 Lists - Spear.csv`,
    BOW: `${shortCutVariable}/Disgaea 5 Lists - Gun.csv`,
    AXE: `${shortCutVariable}/Disgaea 5 Lists - Axe.csv`,
    STAFF: `${shortCutVariable}/Disgaea 5 Lists - Staff.csv`,
    MONSTER_ATK: `${shortCutVariable}/Disgaea 5 Lists - MATK.csv`,
};

const items = {
    FIST: [],
    SWORD: [],
    SPEAR: [],
    BOW: [],
    AXE: [],
    STAFF: [],
    MONSTER_ATK: [],
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

    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(csv())
            .on('data', (line) => {
                if (isParsedDataValid(line)) {
                    try {
                        container.push(new Item(line));
                    } catch (error) {
                        throw new Error(`Error when parsin file [${file}]\n${error}`)
                    }
                }
            })
            .on('error', () => reject(Error(`Could not parse file [${file}]`)))
            .on('end', () => {
                resolve(container);
                return container;
            });
    });
}

async function parseAllItems() {
    for (let fileKey in ItemFiles) {
        items[fileKey] = await parseFile(ItemFiles[fileKey]);
    }
}

//todo: Rather than create a json file, probably create some javascript containing the proper data as to not have to parse it back in main app
parseAllItems().then(async () => {
    await fs.writeFileSync(bundleLocation, JSON.stringify(items, null, 2), "utf-8");
    console.log(`Successfully created JSON bundle at [${bundleLocation}]`)
});
