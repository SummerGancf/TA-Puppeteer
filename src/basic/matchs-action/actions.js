const node = require('./selector')
const DEF_DELAY = 1
async function click(object,selector) {
  // let ele = await node.getElement(page,selector);
  await object.click(selector)
  page.waitFor(2)
}

async function clickMutil(object,selector,button,clickCount=1,delay=DEF_DELAY) {
  // let ele = await node.getElement(page,selector);
  await object.click(selector,{button:button,clickCount:clickCount,delay:delay});
}

async function input(object,selector,text) {
  // await node.getElement(page,selector);
  await object.type(selector,text,{delay: 100})
}

async function focus(object,selector) {
  // let ele = await node.getElement(page,selector);
  await object.focus(selector);
}




module.exports = {
  click: click,
  clickMutil: clickMutil,
  input:input,
  focus:focus
};