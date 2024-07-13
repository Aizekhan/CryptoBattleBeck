const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    id: Number,
    level: Number
});

const heroSchema = new mongoose.Schema({
    id: String,
    level: Number,
    experience: Number,
    UpgradeCost: Number,
    UpgradeScale: Number,
    name: String,
    race: String,
    religion: String,
    ideology: String,
    class: String,
    profa1: String,
    profa2: String,
    profa3: String,
    baseStats: {
        hp: Number,
        armor: Number,
        damage: Number,
        attackSpeed: Number,
        blockChance: Number,
        penetrationChance: Number,
        critChance: Number,
        dodgeChance: Number,
        critPower: Number,
        accuracy: Number,
        regenSpeed: Number
    },
    baseIncome: {
        goldPerTap: Number,
        goldPer8Hours: Number,
        commonItemChance: Number,
        rareItemChance: Number,
        epicItemChance: Number,
        legendaryItemChance: Number,
        uniqueItemChance: Number
    },
    img: String, // Assuming it is a string URL or path
    passiveSkills: [cardSchema],
    equipment: [cardSchema],
    battleCards: [cardSchema],
    farmSkills: [cardSchema],
    townCards: [cardSchema],
    locationCards: [cardSchema],
    dungeonCards: [cardSchema],
    monsterCards: [cardSchema],
    minesGoldCards: [cardSchema],
    miningSkillsCards: [cardSchema],
    activeSkills: [cardSchema]
});

const userProgressSchema = new mongoose.Schema({
    userId: String,
    username: String,
    level: Number,
    experience: Number,
    balance: Number,
    totalIncomePer8Hours: Number,
    totalTapIncome: Number,
    currentHeroId: String,
    heroes: [heroSchema]
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

module.exports = UserProgress;
