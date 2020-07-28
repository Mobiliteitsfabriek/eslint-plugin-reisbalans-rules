const reportError = (context, node) => {
  const name = node.source.raw.split('/').pop().split('.')[0]
  .replace(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1))
  .replace(/[\W+|_]/g, "")
  const fix = `import { ReactComponent as ${name} } from ${node.source.raw}`
  
  context.report({
    node,
    loc: node.loc,
    message: `Invalid svg import`,
    fix(fixer) {
      return [fixer.replaceText(node, fix)]
    }
  })
}

module.exports = {
  meta: {
    docs: {
      description: "Enforce the import of svg images",
      recommended: true
    },
    fixable: "code",
    type: "suggestion",
    schema: []
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.type !== "Literal") return
        if (!node.source.raw.match(/\.svg/)) return
        if (node.specifiers[0] && node.specifiers[0].imported && node.specifiers[0].imported.name === "ReactComponent") {
          return
        }
        
        reportError(context, node)
      }
    }
  }
}
