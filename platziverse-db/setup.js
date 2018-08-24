'use strict'

const debug = require('debug')('platziverse:db:setup') // Require instalar npm install debug --save. Nota: ('platziverse:db:setup') es el NAME_SPACE donde voy a hacer el DEBUG
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happend :)')
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgresql',
    logging: s => debug(s), // Llamo al modulo de debug instalado para hacer el logging
    setup: true
  }

  await db(config).catch(handleFaltalError)
  console.log('success')
  process.exit(0)
}

function handleFaltalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
