/**
 * Rule: favour custom React Components over the vanilla html ones.
 * If we have custom React Components that replace the vanilla HTML ones, then return a warning, which will ask to replace them.
 */

const preventElements = {
  a: 'Please use the HTMLComponents/Link Component!',
  form: 'Please use the FormComponents/Form Component!',
  input: 'Please use the FormComponents/Input Component!',
  button: 'Please use the FormComponents/Button Component!',
  checkbox: 'Please use the FormComponents/Checkbox Component!',
  label: 'Please use the FormComponents/Label Component!',
}

const keys = Object.keys(preventElements)

module.exports = {
  meta: {
    docs: {
      description: 'Favour custom React components over the vanilla HTML ones.',
      recommended: true,
    },
    fixable: 'code',
    type: 'suggestion',
    schema: [],
  },
  create(context) {
    return {
      JSXIdentifier(node) {
        if (keys.indexOf(node.name) !== -1) {
          if (node.parent.type !== 'JSXOpeningElement') return
          context.report({
            node,
            loc: node.loc,
            message: preventElements[node.name],
          })
        }
      },
    }
  },
}
