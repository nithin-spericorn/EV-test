const models = require('../db/models');

models.sequelize.sync()
    .then(() => console.log('Success! db sync done!'))
    .catch((e) => console.error('Something went wrong with db update!\nError:', e.message));
