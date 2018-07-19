const utils = require('../utils')
async function notToMatch(instance, matcher, options) {

  const { page, handle } = await utils.getContext(instance, () => document.body)

  try {
    await page.waitForFunction(
      (handle, matcher) => {
        if (!handle) return false
        return handle.textContent.match(new RegExp(matcher)) === null
      },
      options,
      handle,
      matcher,
    )
  } catch (error) {
    throw utils.enhanceError(error, `Text found "${matcher}"`)
  }
}

exports=notToMatch
