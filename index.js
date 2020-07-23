module.exports = {
  rules: {
    // eslint-disable-next-line global-require
    'prevent-vanilla-html-elements': require('./rules/prevent-vanilla-html-elements'),
    // eslint-disable-next-line global-require
    'enforce-scss-modules': require('./rules/enforce-scss-modules'),
  },
  configs: {
    recommended: {
      plugins: ['reisbalans-rules'],
      rules: {
        'reisbalans-rules/prevent-vanilla-html-elements': 'error',
        'reisbalans-rules/enforce-scss-modules': 'error',
      },
    },
  },
}
