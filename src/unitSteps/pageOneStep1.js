const page1 = require('../pages/pageOne.js')
async function search(page) {
  console.log("test")
  await page1.inputSearchbox(page);
  await page1.clickSubmit(page);
}

module.exports.search=search
