const getPuppeteerType =exports.getPuppeteerType = instance => {
  if (
    instance &&
    instance.constructor &&
    instance.constructor.name &&
    ['Page', 'ElementHandle'].includes(instance.constructor.name) &&
    instance.$
  ) {
    // console.log("instance.constructor.name:"+instance.constructor.name)
    return instance.constructor.name
  }
  return null
}

const getContext = exports.getContext = async (instance, pageFunction) => {
  const type = getPuppeteerType(instance)
  switch (type) {
    case 'Page':
      return {
        page: instance,
        handle: await instance.evaluateHandle(pageFunction),
      }
    case 'ElementHandle': {
      const executionContext = await instance.executionContext()
      return {
        page: await executionContext.frame(),
        handle: instance,
      }
    }
    default:
      throw new Error(`${type} is not implemented`)
  }
}

const enhanceError =exports.enhanceError= (error, message) => {
  error.message = `${message}\n${error.message}`
  return error
}

const isRegExp = input =>
  Object.prototype.toString.call(input) === '[object RegExp]'

const expandSearchExpr = exports.expandSearchExpr = expr => {
  if (isRegExp(expr)) return { text: null, regexp: expr.toString() }
  if (typeof expr === 'string') return { text: expr, regexp: null }
  return { text: null, regexp: null }
}

