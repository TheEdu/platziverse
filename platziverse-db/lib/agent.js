'use strict'

module.exports = function setupAgent (AgentModel) {
  function findById (id) {
    return AgentModel.findByID(id)
  }

  return {
    findById: findById
  }
}
