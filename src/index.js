module.exports = function(babel) {
  var t = babel.types;

  return {
    visitor: {
      ExportDefaultDeclaration: function(path) {
        if (path.node.declaration.callee && path.node.declaration.callee.name == 'defineMessages') {
          var objectProperties = path.node.declaration.arguments[0].properties;

          var ids = objectProperties[0].value.value;
          
          objectProperties.splice(0, 1);
          
          objectProperties.forEach(function(property, index) {
            var key       = property.key.value || property.key.name;
            var idPath    = `${ ids }.${ key }`;
          
            if (t.isObjectExpression(property.value)) {
              property.value.properties.unshift(
                t.objectProperty(t.identifier('id'), t.stringLiteral(idPath))
              )
            }
            else if (t.isStringLiteral(property.value) || t.isTemplateLiteral(property.value)) {
              objectProperties[index].value = t.objectExpression([
                t.objectProperty(t.identifier('id'), t.stringLiteral(idPath)),
                t.objectProperty(t.identifier('defaultMessage'), property.value)
              ])
            }
            else {
              throw new Error('Smth wrong')
            }
          });
        }
      }
    }
  };
};
