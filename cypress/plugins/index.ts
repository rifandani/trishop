/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// This function is called when a project is opened or re-opened (e.g. due to the project's config changing)
// eslint-disable-next-line no-unused-vars
module.exports = (
  _on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  config.env.adminEmail = process.env.CYPRESS_ADMIN_EMAIL
  config.env.adminPassword = process.env.CYPRESS_ADMIN_PASSWORD
  config.env.userEmail = process.env.CYPRESS_USER_EMAIL
  config.env.userPassword = process.env.CYPRESS_USER_PASSWORD

  return config
}
