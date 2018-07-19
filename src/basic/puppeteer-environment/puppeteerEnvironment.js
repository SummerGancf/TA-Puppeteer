const chalk = require('chalk')
const NodeEnvironment = require('jest-environment-node')
const puppeteer = require('puppeteer')
const fs = require('fs')
// const os = require('os')
// const path = require('path')
const constants = require('./constants')
const pti = require('puppeteer-to-istanbul')


class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
  }

  async setup() {
    console.log(chalk.yellow('Setup Test Environment.'))
    await super.setup()
    const wsEndpoint = fs.readFileSync(constants.WS_ENDPOINT_PATH, 'utf8')
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found')
    }
    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    })

    this.global.page = await this.global.__BROWSER__.newPage()
    await Promise.all([
      this.global.page.coverage.startJSCoverage(),
      this.global.page.coverage.startCSSCoverage()
    ])
  }

  async teardown() {
    console.log(chalk.yellow('Teardown Test Environment.'))
    await super.teardown()

    const [jsCoverage, cssCoverage] = await Promise.all([
      this.global.page.coverage.stopJSCoverage(),
      this.global.page.coverage.stopCSSCoverage(),
    ]);
    let totalBytes = 0;
    let usedBytes = 0;
    const coverage = [...jsCoverage, ...cssCoverage];
    for (const entry of coverage) {
      totalBytes += entry.text.length;
      for (const range of entry.ranges)
        usedBytes += range.end - range.start - 1;
    }
    console.log(`Bytes used: ${usedBytes / totalBytes * 100}%`);
    pti.write(jsCoverage)

    this.global.page.close()
  }
  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = PuppeteerEnvironment
