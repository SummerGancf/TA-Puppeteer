module.exports = {
  globalSetup: './packages/basic/puppeteer-environment/setup.js',
  globalTeardown: './packages/basic/puppeteer-environment/teardown.js',
  testEnvironment: './packages/basic/puppeteer-environment/puppeteerEnvironment.js',
  setupTestFrameworkScriptFile: "./packages/basic/puppeteer-expect",
}
