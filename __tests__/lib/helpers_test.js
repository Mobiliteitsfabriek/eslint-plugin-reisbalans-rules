var helpers = require("../../lib/helpers")

var testStrings = [
  'myIcon.svg',
  './my-icon.svg',
  './my_icon.svg',
  './myIcon.svg',
  './MyIcon.svg',
  './my-icon.svg',
  './my-icon.ext.svg',
  '../my-icon.ext.svg',
  '../../../my-icon.svg',
]

test('should return MyIcon', () => {
  testStrings.forEach((str) =>{
    expect(helpers.stringToComponentName('./my-icon.svg')).toBe('MyIcon')
  })
})
