(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.deepick = factory());
}(this, (function () { 'use strict';

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
const warnUndefined = key => console.error(`\`${key}\` is an undefined property on the source object`);

function deepPick (source, partten, options) {
  options = options || {};
  if (Array.isArray(partten)) {
    const res = [];
    source.forEach((o, i) => {
      res[i] = deepPick(o, partten[0], options);
    });
    return res
  } else if (isObject(partten)) {
    const res = {};
    Object.keys(partten).forEach((key) => {
      if (!Array.isArray(partten[key]) && !isObject(partten[key])) {
        res[key] = source[key];
      } else {
        if (!Array.isArray(source[key]) && !isObject(source[key])) {
          options.warn && warnUndefined(key);
          res[key] = source[key];
        } else {
          res[key] = deepPick(source[key], partten[key], options);
        }
      }
    });
    return res
  }
}

return deepPick;

})));
