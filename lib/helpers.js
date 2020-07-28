"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true
})
exports.stringToComponentName = void 0

const stringToComponentName = str =>
  str.split('/').pop().split('.')[0].replace(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+/g, word => word.charAt(0).toUpperCase() + word.slice(1)).replace(/[\W+|_]/g, "")


exports.stringToComponentName = stringToComponentName
