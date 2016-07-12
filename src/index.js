module.exports = function(babel) {
  var t = babel.types;
  var idsPath;

  return {
    visitor: {
      StringLiteral: function(path) {
        if (t.isVariableDeclarator(path.parent)) {
          idsPath = path.node.value;
        }
      },
      ObjectExpression: function(path) {
        if (!t.isAssignmentExpression(path.parent)) {
          var idPath = `${ idsPath }.${ path.parent.key.name }`;

          path.node.properties.push(
            t.objectProperty(t.identifier('id'), t.stringLiteral(idPath))
          );
        }
      }
    }
  };
};
