'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')
const setupAgent = require('./lib/agent')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true // Sqlite return JSON
    }
  })

  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate() // Verifica la conexion con la DB
  // sequelize.sync() // Inicializa la DB con los modelos y las relaciones definidas

  if (config.setup) {
    await sequelize.sync({ force: true }) // Crea la base de datos (force: true --> si la base existe la pisa)
  }

  const Agent = setupAgent(AgentModel)
  const Metric = {}

  return {
    Agent: Agent,
    Metric: Metric
  }
}
