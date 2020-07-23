const reportError = (context, node) => {
  const parts = node.source.raw.split('.')
  const fix = `import Styles from '.${parts[1]}.module.scss`

  context.report({
    node,
    loc: node.loc,
    message: `Please use "${fix}"`,
  })
}

module.exports = {
  meta: {
    docs: {
      description: 'Enforce the import of scss modules',
      recommended: true,
    },
    fixable: 'code',
    type: 'suggestion',
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.type !== 'Literal') return
        if (!node.source.raw.match(/\.scss/)) return
        if (!node.source.raw.match(/\.module\./)) {
          reportError(context, node)
          return
        }

        if (!node.specifiers.length) {
          reportError(context, node)
          return
        }

        if (node.specifiers[0].local.name !== 'Styles') reportError(context, node)
      },
    }
  },
}
