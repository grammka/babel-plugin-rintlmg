module.exports = function(babel) {
  var t = babel.types;
  var idsPath;

  return {
    visitor: {
      VariableDeclaration: function(path) {
        if (path.node.loc && path.node.loc.start.line == 1) {
          path.insertBefore(
            t.importDeclaration(
              [
                t.importSpecifier(
                  t.identifier('defineMessages'),
                  t.identifier('defineMessages')
                )
              ],
              t.stringLiteral('react-intl')
            )
          );
          
          idsPath = path.node.declarations[0].init.value;

          path.remove();
        }
      },
      
      ExportDefaultDeclaration: function(path) {
        if (!t.isCallExpression(path.node.declaration)) {
          path.replaceWith(
            t.exportDefaultDeclaration(
              t.callExpression(
                t.identifier('defineMessages'),
                [ path.node.declaration ]
              )
            )
          )
        }
      },
      
      ObjectExpression: function(path) {
        if (!t.isExportDefaultDeclaration(path.parent) && !t.isCallExpression(path.parent)) {
          var idPath = `${ idsPath }.${ path.parent.key.name || path.parent.key.value }`;
          
          path.node.properties.push(
            t.objectProperty(t.identifier('id'), t.stringLiteral(idPath))
          );
        }
      }
    }
  };
};
