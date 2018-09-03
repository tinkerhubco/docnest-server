const _ = require('lodash');
const config = require('config');
module.exports = _.merge(_.cloneDeep(config.get('database')), {
  entities: ['build/app/database/entities/*.entity.js'],
  migrations: [ 'build/app/database/migrations/*.js' ],
  cli: {
    migrationsDir: 'src/app/database/migrations'
  }
});