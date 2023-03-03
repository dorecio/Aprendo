const db = require('../config/connection');
const { Schedule,Theme,User } = require('../models');
const scheduleSeeds = require('./scheduleSeeds.json');
const themeSeeds = require('./themeSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
    await Schedule.deleteMany({});
    await Schedule.create(scheduleSeeds);
    await Theme.deleteMany({});
    await Theme.create(themeSeeds);
    await User.deleteMany({});
    await User.create(userSeeds);

    console.log('all done!');
    process.exit(0);
});
