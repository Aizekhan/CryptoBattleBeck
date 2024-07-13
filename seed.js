// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserProgress = require('./models/UserProgress');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        seedDatabase();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

const seedDatabase = async () => {
    try {
        const initialUserProgress = {
            userId: 'user_1_id',
            username: 'Player',
            level: 0,
            experience: 6000,
            balance: 1500,
            totalIncomePer8Hours: 300,
            totalTapIncome: 50,
            currentHeroId: 'hero_1_id',
            heroes: [
                {
                    id: 'hero_1_id',
                    level: 0,
                    experience: 1500,
                    UpgradeCost: 150,
                    UpgradeScale: 1.2,
                    name: 'Hero 1',
                    race: 'Human',
                    religion: 'none',
                    ideology: 'Techno',
                    class: 'Warrior',
                    profa1: 'Blacksmith',
                    profa2: 'Miner',
                    profa3: 'Warrior Trainer',
                    baseStats: {
                        hp: 110,
                        armor: 6,
                        damage: 6,
                        attackSpeed: 1.1,
                        blockChance: 52,
                        penetrationChance: 52,
                        critChance: 52,
                        dodgeChance: 52,
                        critPower: 152,
                        accuracy: 92,
                        regenSpeed: 6
                    },
                    baseIncome: {
                        goldPerTap: 12,
                        goldPer8Hours: 90,
                        commonItemChance: 11,
                        rareItemChance: 6,
                        epicItemChance: 2,
                        legendaryItemChance: 0.6,
                        uniqueItemChance: 0.2
                    },
                    img: 'path/to/hero1/image',
                    passiveSkills: [
                        { id: 1, level: 0 },
                        { id: 2, level: 0 }
                    ],
                    equipment: [
                        { id: 1, level: 0 },
                        { id: 2, level: 0 }
                    ],
                    battleCards: [
                        { id: 1, level: 0 },
                        { id: 2, level: 0 }
                    ],
                    farmSkills: [
                        { id: 1, level: 0 },
                        { id: 2, level: 0 }
                    ],
                    townCards: [
                        { id: 1, level: 0 },
                        { id: 2, level: 0 }
                    ],
                    locationCards: [
                        { id: 1, level: 0 },
                        { id: 2, level: 0 }
                    ],
                    dungeonCards: [
                        { id: 1, level: 0 },
                        { id: 2, level: 0 }
                    ],
                    monsterCards: [
                        { id: 1, level: 0 },
                        { id: 2, level: 0 }
                    ],
                    minesGoldCards: [
                        { id: 1, level: 0 },
                        { id: 2, level: 0 },
                        { id: 3, level: 0 },
                        { id: 4, level: 0 },
                        { id: 5, level: 0 },
                        { id: 6, level: 0 },
                        { id: 7, level: 0 },
                        { id: 8, level: 0 }
                    ],
                    miningSkillsCards: [
                        { id: 1, level: 0 },
                        { id: 2, level: 0 }
                    ],
                    activeSkills: [
                        { id: 1, level: 0 },
                        { id: 2, level: 0 }
                    ]
                }
            ]
        };

        await UserProgress.deleteMany({});
        await UserProgress.create(initialUserProgress);

        console.log('Database seeded!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
