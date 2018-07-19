// import { getContext, enhanceError, expandSearchExpr } from '../utils'
// import { defaultOptions } from '../options'
const utils = require('../utils')

async function toMatchElement(
  instance,
  selector,
  { text: searchExpr, ...options } = {},
) {
  // options = defaultOptions(options)

  const { page, handle } = await utils.getContext(instance, () => document)

  const { text, regexp } = utils.expandSearchExpr(searchExpr)

  const getElement = (handle, selector, text, regexp) => {
    const elements = handle.querySelectorAll(selector)
    if (regexp !== null) {
      const [, pattern, flags] = regexp.match(/\/(.*)\/(.*)?/)
      return [...elements].find(({ textContent }) =>
        textContent
          .replace(/\s+/g, ' ')
          .trim()
          .match(new RegExp(pattern, flags)),
      )
    }
    if (text !== null) {
      return [...elements].find(({ textContent }) =>
        textContent
          .replace(/\s+/g, ' ')
          .trim()
          .includes(text),
      )
    }
    return elements[0]
  }

  try {
    await page.waitForFunction(
      getElement,
      options,
      handle,
      selector,
      text,
      regexp,
    )
  } catch (error) {
    throw utils.enhanceError(
      error,
      `Element ${selector}${
        text !== null || regexp !== null ? ` (text: "${text || regexp}") ` : ' '
      }not found`,
    )
  }

  const jsHandle = await page.evaluateHandle(
    getElement,
    handle,
    selector,
    text,
    regexp,
  )
  return jsHandle.asElement()
}

exports.default=toMatchElement
