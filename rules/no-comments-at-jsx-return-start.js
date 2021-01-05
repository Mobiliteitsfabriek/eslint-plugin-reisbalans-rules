// Stolen from https://github.com/facebook/create-react-app/issues/8687#issuecomment-747540857.

module.exports = {
  meta: {
    docs: {
      description: "Forbid inline comments at the start of the return of a JSX file due to a bug in Babel (https://github.com/facebook/create-react-app/issues/8687)",
      recommended: true
    },
    fixable: "code",
    type: "suggestion",
    schema: []
  },
  create(context) {
    return {
      ReturnStatement: function (node) {
        const comments = context.getCommentsInside(node)
        const lineOfReturnStatement = node.loc.start.line

        comments.forEach(comment => {
          const lineOfComment = comment.loc.start.line

          // Only check for inline comments
          if (comment.type !== 'Line') return

          // Only check for comments as FIRST THING after a `return` statement
          if (lineOfReturnStatement !== lineOfComment && lineOfReturnStatement !== lineOfComment - 1) return

          // We have an error, report it!
          context.report({
            node,
            loc: node.loc,
            message: 'Do not insert inline comments in return statement first two lines'
          })
        })
      }
    }
  }
}
