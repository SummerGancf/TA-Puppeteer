const actions = require('../basic/matchs-action/actions.js')
const searchbox = '.b_searchbox'
const Submit= '.b_searchboxSubmit';
async function inputSearchbox(page) {
  await actions.input(page,searchbox,'puppeteer')
}

async function clickSubmit(page) {
  await actions.click(page,Submit)
}

module.exports = {
  inputSearchbox: inputSearchbox,
  clickSubmit: clickSubmit
}
