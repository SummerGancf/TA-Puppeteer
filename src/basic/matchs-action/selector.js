const DEFAULT_OUTTIME = 300;
async function getElement(page, selector) {
  const ele = await page.$(selector);
  if (!ele) {
    return getElement(page,selector);
  } else {
    return ele;
  }
}

async function getElements(page, selector) {
  const eles = await page.$$(selector);
  if (Array.isArray(eles) && eles.length === 0) {
    return getElemments(page,selector);
  } else {
    return eles;
  }
}
module.exports= {
  getElement:getElement,
  getElements:getElements
};