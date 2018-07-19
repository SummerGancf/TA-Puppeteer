// const utils = require('../utils')
//
// async function toMatch(instance, matcher, options) {
//   // options = defaultOptions(options)
//
//   const { page, handle } = await utils.getContext(instance, () => document.body)
//
//   const { text, regexp } = utils.expandSearchExpr(matcher)
//
//   try {
//     await page.waitForFunction(
//       (handle, text, regexp) => {
//         if (!handle) return false
//         if (regexp !== null) {
//           const [, pattern, flags] = regexp.match(/\/(.*)\/(.*)?/)
//           return (
//             handle.textContent
//               .replace(/\s+/g, ' ')
//               .trim()
//               .match(new RegExp(pattern, flags)) !== null
//           )
//         }
//         if (text !== null) {
//           return handle.textContent
//             .replace(/\s+/g, ' ')
//             .trim()
//             .includes(text)
//         }
//         return false
//       },
//       options,
//       handle,
//       text,
//       regexp,
//     )
//   } catch (error) {
//     throw utils.enhanceError(error, `Text not found "${matcher}"`)
//   }
// }
//
// exports.default=toMatch
