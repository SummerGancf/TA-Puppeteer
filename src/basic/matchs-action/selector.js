const DEFAULT_OUTTIME = 300;
async function getElement(handle,selector) {
  const ele = await handle.$(selector);
  if (!ele) {
    return getElement(selector);
  } else {
    return ele;
  }
}

async function getElements(handle, selector) {
  const eles = await handle.$$(selector);
  if (Array.isArray(eles) && eles.length === 0) {
    return getElemments(handle,selector);
  } else {
    return eles;
  }
}

async function selectElements(handle, selector, ...values) {
  const eles = await handle.select(selector,...values);
  if (Array.isArray(eles) && eles.length === 0) {
    return selectElements(handle,selector,...value);
  } else {
    return eles;
  }
}

async function getFrames() {
  return await page.frames()
}

async function getiFrames(i) {
  const eleHandle = await page.frames()[i]
  return eleHandle
}
async function getEval(handle,selector, pageFunction) {
  return await handle.$$eval(selector, pageFunction)
}
async function setCookie(cookies) {
  await page.setCookie(cookies)
}
async function deleteCookie(cookies) {
  await page.deleteCookie(cookies)
}
async function cookies(urls) {
  await page.cookies(urls)
}


module.exports= {
  getElement:getElement,
  getElements:getElements,
  selectElements:selectElements,
  getFrames:getFrames,
  getiFrames:getiFrames,
  getEval:getEval,
  setCookie:setCookie,
  deleteCookie:deleteCookie,
  cookies:cookies
};