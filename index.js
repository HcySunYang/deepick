const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export default function deepPick (source, partten) {
  if (Array.isArray(partten)) {
    const res = []
    source.forEach((o, i) => {
      res[i] = deepPick(o, partten[0])
    })
    return res
  } else if (isObject(partten)) {
    const res = {}
    Object.keys(partten).forEach((key) => {
      if (!Array.isArray(partten[key]) && !isObject(partten[key])) {
        res[key] = source[key]
      } else {
        res[key] = deepPick(source[key], partten[key])
      }
    })
    return res
  }
}