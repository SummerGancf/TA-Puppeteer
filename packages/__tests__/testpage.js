var step = require('../../packages/unitSteps/pageOneStep1.js')

const timeout = 5000

describe(
  '/ (Home Page)',
  () => {
    // let page
    beforeAll(async () => {
      // page = await global.__BROWSER__.newPage()
      await page.goto('https://www.bing.com')
    }, timeout)

    afterAll(async () => {
      // await page.close()
    })

    it('page should contain puppeteer ', async () => {
      await step.search(page);
      await page.screenshot({path: 'screenshot.png' });
      let text = await page.evaluate(() => document.body.innerText);
      expect(text).toContain('puppeteer')
    })
  },
  timeout
)
