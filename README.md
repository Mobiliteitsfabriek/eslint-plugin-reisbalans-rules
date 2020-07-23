# ESLint plugin Reisbalans Rules

This package contains custom ESLint rules that are being used by the interface.

## How to use this package?

`yarn add -D eslint-plugin-reisbalans-rules`

Add the following to your .eslintrc.js:

```js
{
  plugins: ['reisbalans-rules'],
  extends: ['plugin:reisbalans-rules/recommended']
}

```

And then run:

`yarn lint`
