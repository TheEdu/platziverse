'use strict'

const test = require('ava')

let config = {
  logging: function () {}
}
let db = null

test.beforeEach(async () => {
  const index = require('../')
  db = await index(config)
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exist')
  // t.pass()
})
