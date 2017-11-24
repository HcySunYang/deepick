(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.deepick = factory());
}(this, (function () { 'use strict';

var isObject = function (obj) { return Object.prototype.toString.call(obj) === '[object Object]'; };
var warnUndefined = function (key) { return console.error(("`" + key + "` is an undefined property on the source object")); };

function deepPick (source, partten, options) {
  options = options || {};
  if (Array.isArray(partten)) {
    var res = [];
    source.forEach(function (o, i) {
      res[i] = deepPick(o, partten[0], options);
    });
    return res
  } else if (isObject(partten)) {
    var res$1 = {};
    Object.keys(partten).forEach(function (key) {
      if (!Array.isArray(partten[key]) && !isObject(partten[key])) {
        res$1[key] = source[key];
      } else {
        if (!Array.isArray(source[key]) && !isObject(source[key])) {
          options.warn && warnUndefined(key);
          res$1[key] = source[key];
        } else {
          res$1[key] = deepPick(source[key], partten[key], options);
        }
      }
    });
    return res$1
  }
}

return deepPick;

})));
