const reportError = (context, node) => {
  const parts = node.source.raw.split(".");
  const name = parts[1]
  .replace(/[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1))
  .replace(/[\W+|_]/g, "");
  const fix = `import { ReactComponent as ${name} } from ${node.source.raw}`;
  
  context.report({
    node,
    loc: node.loc,
    message: `Please use "${fix}"`,
    fix(fixer) {
      return [fixer.replaceTextRange([node.start, node.end], fix)];
    }
  });
};

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
        if (node.source.type !== "Literal") return;
        if (!node.source.raw.match(/\.svg/)) return;
        if (node.specifiers[0] && node.specifiers[0].imported && node.specifiers[0].imported.name === "ReactComponent") {
          return;
        }
        
        reportError(context, node);
      }
    };
  }
};
