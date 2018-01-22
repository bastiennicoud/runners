/**
 * Used to prefix a number
 *
 * @export
 * @param {Number} number number to prefix
 * @param {any} [{ symbol = '0', count = 2 }={}] symbol used to prefix number
 * @returns
 */
export function prefixNumber(number: Number, { symbol = '0', count = 2 } = {}) {
  let base = ''
  for (let i = 0; i < count; i++) base += symbol
  return (base + '' + number).slice(
    -1 * Math.max(count, number.toString().length)
  )
}
