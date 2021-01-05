module.exports = {
  rules: {
    // eslint-disable-next-line global-require
    'prevent-vanilla-html-elements': require('./rules/prevent-vanilla-html-elements'),
    // eslint-disable-next-line global-require
    'enforce-scss-modules': require('./rules/enforce-scss-modules'),
    // eslint-disable-next-line global-require
    'enforce-svg-import': require('./rules/enforce-svg-import'),
    // eslint-disable-next-line global-require
    'disallow-tagged-templates-for-translations': require('./rules/disallow-tagged-templates-for-translations'),
    // eslint-disable-next-line global-require
    'no-comments-at-jsx-return-start': require('./rules/no-comments-at-jsx-return-start'),
  },
  configs: {
    recommended: {
      plugins: ['reisbalans-rules'],
      overrides: [{
        files: ['**/*.tsx', '**/*.jsx'],
        excludedFiles: ['*.spec.*'],
        rules: {
          'reisbalans-rules/no-comments-at-jsx-return-start': 'error',
        }
      }],
      rules: {
        'reisbalans-rules/prevent-vanilla-html-elements': 'error',
        'reisbalans-rules/enforce-scss-modules': 'error',
        'reisbalans-rules/enforce-svg-import': 'error'
      },
    },
  },
}
