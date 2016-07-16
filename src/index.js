module.exports = function(babel) {
  var t = babel.types;

  return {
    visitor: {
      Program: {
        exit: function(path) {
          path.unshiftContainer('body', [
            t.importDeclaration(
              [
                t.importSpecifier(
                  t.identifier('defineMessages'),
                  t.identifier('defineMessages')
                )
              ],
              t.stringLiteral('react-intl')
            )
          ]);
        }
      },

      ExpressionStatement: function(path) {
        if (path.node.expression.callee && path.node.expression.callee.name == 'defineMessages') {
          path.replaceWith(
            t.exportDefaultDeclaration(path.node.expression)
          )
        }
      },

      CallExpression: function(path) {
        if (!path.node.callee || path.node.callee.name != 'defineMessages' || path.node.loc.start.line != 1) {
          return;
        }

        var ids = path.node.arguments[0].properties[0].value.value;

        path.node.arguments[0].properties.splice(0, 1);

        path.node.arguments[0].properties.forEach(function(property, index) {
          var key       = property.key.value || property.key.name;
          var value     = property.value.value || property.value.name;
          var idPath    = `${ ids }.${ key }`;

          if (t.isObjectExpression(property.value)) {
            property.value.properties.unshift(
              t.objectProperty(t.identifier('id'), t.stringLiteral(idPath))
            )
          }
          else if (t.isStringLiteral(property.value)) {
            path.node.arguments[0].properties[index] = t.objectExpression([
              t.objectProperty(t.identifier('id'), t.stringLiteral(idPath)),
              t.objectProperty(t.identifier('defaultMessage'), t.stringLiteral(value))
            ])
          }
          else {
            throw new Error('Smth wrong')
          }
        });
      }
    }
  };
};
