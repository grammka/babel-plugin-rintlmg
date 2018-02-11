module.exports = function(babel) {
  var t = babel.types;
  
  var getMessage = function (id, value) {
    return t.objectExpression([
      t.objectProperty(t.identifier('id'), t.stringLiteral(id)),
      t.objectProperty(t.identifier('defaultMessage'), value)
    ])
  };

  var transformProps = function (properties, rootPath) {
    properties.forEach(function(property, index) {
      var key       = property.key.value || property.key.name;
      var value     = property.value;
      var idPath    = `${rootPath}.${key}`;

      if (t.isObjectExpression(value)) {
        var nestedProperties = value.properties;

        transformProps(nestedProperties, idPath);
      }
      else if (t.isStringLiteral(property.value) || t.isTemplateLiteral(value)) {
        properties[index].value = getMessage(idPath, value)
      }
      else {
        throw new Error('Smth wrong')
      }
    })
  };

  return {
    visitor: {
      ExportDefaultDeclaration: function(path, state) {
        if (path.node.declaration.callee && path.node.declaration.callee.name === 'defineMessages') {
          var pathname          = state.file.opts.filename;
          var rootId            = pathname.replace(process.cwd() + '/', '').replace(/\/[^/]+.js$/, '').replace(/\//g, '.');
          var objectProperties  = path.node.declaration.arguments[0].properties;

          transformProps(objectProperties, rootId);
        }
      }
    }
  };
};
