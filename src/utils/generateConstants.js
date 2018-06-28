import keyMirror from './keyMirror'

export const generateConstants = (r, { successError = [], chain = [], regular = [] }) => {
  var obj = {}
  successError.forEach(c => (obj = { ...obj, ...successErrorConstants(c) }))
  chain.forEach(c => (obj = { ...obj, ...chainConstants(c)}))
  regular.forEach(c => (obj[c] = null))
  return keyMirror(obj, r)
}

export const chainConstants = c => ({
  [`${c}`]: null,
  [`${c}_HASH`]: null,
  [`${c}_RECEIPT`]: null,
  [`${c}_SUCCESS`]: null,
  [`${c}_CONFIRMATION`]: null,
  [`${c}_ERROR`]: null
})

export const successErrorConstants = c => ({
  [`${c}`]: null,
  [`${c}_SUCCESS`]: null,
  [`${c}_ERROR`]: null
})
