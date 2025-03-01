const Graph = require("node-dijkstra");
const fs = require("fs");
const { convertCSVToArray } = require("convert-csv-to-array");
const csv = require("csv-parser");
const { time } = require("console");
const route = new Graph();

Banklinks = [];
fs.createReadStream("data/links.csv")
    .pipe(csv())
    .on("data", (data) => Banklinks.push(data))
    .on("end", () => {
        console.log("Banklinks are fetched");
    });

BankCharges = [];
var result;
fs.createReadStream("data/banks.csv")
    .pipe(csv())
    .on("data", (data) => BankCharges.push(data))
    .on("end", () => {
        console.log("BankCharges are fetched");
    });


async function findFastestPath(fromBank, toBank) {
    const result = makeGraph(Banklinks, fromBank, toBank);
    return result;
}

async function findCheapestPath(fromBank, toBank) {
    const result = findCheapestRoute(BankCharges, Banklinks, fromBank, toBank);
    console.log(result)
    return result;
}

function findCharge(BankCharges, Bank) {
    const bank = BankCharges.filter((bank) => bank.BIC === Bank);
    return bank[0]?.Charge;
}

function findCheapestRoute(BankCharges, Banklinks, fromBank, toBank) {
    const newMap = new Map();
    Banklinks?.forEach(({ FromBIC, ToBIC, TimeTakenInMinutes }) => {
        if (!newMap.has(FromBIC)) newMap.set(FromBIC, []);
        if (!newMap.has(ToBIC)) newMap.set(ToBIC, []);
        newMap.get(FromBIC).push({ node: ToBIC, charge: findCharge(BankCharges, FromBIC) });
    });

    newMap.forEach((values, keys) => {
        const a = values.reduce((acc, { node, charge }) => {
            acc[node] = charge;
            return acc;
        }, {});
        route.addNode(keys, a);
    });
    const result = route.path(fromBank, toBank, { cost: true });
    return result;
}


function makeGraph(Banklinks, fromBank, toBank) {
    const newMap = new Map();
    Banklinks?.forEach(({ FromBIC, ToBIC, TimeTakenInMinutes }) => {
        if (!newMap.has(FromBIC)) newMap.set(FromBIC, []);
        if (!newMap.has(ToBIC)) newMap.set(ToBIC, []);
        newMap.get(FromBIC).push({ node: ToBIC, time: TimeTakenInMinutes });
    });

    newMap.forEach((values, keys) => {
        const a = values.reduce((acc, { node, time }) => {
            acc[node] = time;
            return acc;
        }, {});
        route.addNode(keys, a);
    });
    const result = route.path(fromBank, toBank, { cost: true });
    return result;
}

module.exports = {
    findFastestPath,
    findCheapestPath
};