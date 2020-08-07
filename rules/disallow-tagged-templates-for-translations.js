const reportError = (context, node) => {
  const reportConfig = {
    node,
    loc: node.loc,
    message: "You cannot use tagged templates for translations. This will not be extracted by our automated tools.",
  }
  
  const value = (node.quasi && node.quasi.quasis && node.quasi.quasis.length && node.quasi.quasis[0].value.raw) || undefined
  if (!value) return context.report(reportConfig)
  
  const fix = `t("${value}")`
  reportConfig.fix = (fixer) => {
    return [fixer.replaceText(node, fix)]
  }
  
  context.report(reportConfig)
}

module.exports = {
  meta: {
    docs: {
      description: "Disallow tagged templates for translation tags",
      recommended: true
    },
    fixable: "code",
    type: "suggestion",
    schema: []
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (node.tag.name !== "t") return
        reportError(context, node)
      }
    }
  }
}
