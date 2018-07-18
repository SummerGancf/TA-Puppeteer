const node = require('./selector')
const DEF_DELAY = 1
async function click(page,selector) {
  let ele = await node.getElement(page,selector);
  await ele.click();
};

async function clickMutil(page,selector,button,clickCount=1,delay=DEF_DELAY) {
  let ele = await node.getElement(page,selector);
  await ele.click({button:button,clickCount:clickCount,delay:delay});
};

async function input(page,selector,text) {
  await node.getElement(page,selector);
  await page.type(selector,text,{delay: 100});
};

module.exports = {
  click: click,
  clickMutil: clickMutil,
  input:input
};