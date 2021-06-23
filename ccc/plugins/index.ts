// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (_on, config) => {
  // read an environment variable and pass its value to the specs
  config.env.username = process.env.USERNAME || 'John Doe'
  // the specs will be able to access the above value by using Cypress.env('userName')

  // IMPORTANT return the updated config object
  return config
}
