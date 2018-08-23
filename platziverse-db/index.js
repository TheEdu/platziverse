'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate() // Verifica la conexion con la DB
  // sequelize.sync() // Inicializa la DB con los modelos y las relaciones definidas

  if (config.setup) {
    await sequelize.sync({ force: true }) // Crea la base de datos (si la base existe la pisa)
  }

  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
