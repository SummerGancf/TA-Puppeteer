const page1 = require('../pages/pageOne.js')
async function search(p) {
  console.log("test")
  await page1.inputSearchbox(p);
  await page1.clickSubmit(p);
}

module.exports.search=search
