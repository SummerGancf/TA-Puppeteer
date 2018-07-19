const utils = require('../utils')
async function notToMatchElement(
  instance,
  selector,
  { text, ...options } = {},
) {
  // options = defaultOptions(options)

  const { page, handle } = await utils.getContext(instance, () => document)

  try {
    await page.waitForFunction(
      (handle, selector, text) => {
        const elements = handle.querySelectorAll(selector)
        if (text !== undefined) {
          return [...elements].every(
            ({ textContent }) => !textContent.match(text),
          )
        }

        return elements.length === 0
      },
      options,
      handle,
      selector,
      text,
    )
  } catch (error) {
    throw utils.enhanceError(
      error,
      `Element ${selector}${
        text !== undefined ? ` (text: "${text}") ` : ' '
      }found`,
    )
  }
}

exports.default=notToMatchElement
